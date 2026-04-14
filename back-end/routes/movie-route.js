const express = require("express")

const {getMovies,saveMovies} = require("../function/readAndWriteFunction")
const router = express.Router()

router.get('/movies',(req,res)=> {
    try{
        const dataMovies = getMovies()
        return res.status(200).send(dataMovies)
    }
    catch(err) {
        return res.status(500).send(err.message)
    }
})

// ////////////////////////////GET/:ID//////////////////////////////////////////    

router.get('/movies/:id',(req,res)=>{
    try{  
        const _id = req.params.id
        const dataMovie = getMovies().find(movie => movie.id === parseInt(_id))
        if(dataMovie){
            return res.status(200).send(dataMovie)
        }

        res.status(404).send("the movie is not found")       
    }
    catch(err) {
        res.status(500).send(err.message)
    }
})


///////////////////////////////////POST//////////////////////////////////////////
router.post('/movies',(req,res)=>{
    try {
        const reqBody = req.body
        const dataMovies = getMovies()
        const exists = typeof reqBody.title ==="string" && typeof reqBody.description==="string" 
                       && !isNaN(reqBody.year)

          const generateId = (dataMovies) => {
             const validId = dataMovies
                .map(movie => Number(movie.id))
                .filter(id => !isNaN(id))

              return validId.length ? Math.max(...validId) + 1 : 1
            }               

            const duplicatedData = dataMovies.filter((obj)=>{
                return obj.title === reqBody.title
            })
            
            if(duplicatedData.length===0){
                if(exists) {
                    const newMovie = {
                        id:generateId(dataMovies),
                        ...reqBody,
                        year: Number(reqBody.year)
                    } 
                    dataMovies.push(newMovie)
                    saveMovies(dataMovies)
                    return res.status(201).send(newMovie)   
                }
            }
        return res.status(400).send("The film is found")
        
    }
    catch(err) {
        res.status(500).send(err.message)
    }
})

module.exports=router