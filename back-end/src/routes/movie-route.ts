import express,{Request,Response} from 'express'

// const {getMovies,saveMovies} = require("../function/readAndWriteFunction")

import {getMovies,saveMovies} from '../function/readAndWriteFunction'

const router = express.Router()

router.get('/movies',(req:Request,res:Response)=> {
    try{
        const dataMovies = getMovies()
        return res.status(200).send(dataMovies)
    }
    catch(err : any ) {
        return res.status(500).send(err.message)
    }
})

// ////////////////////////////GET/:ID//////////////////////////////////////////    

router.get('/movies/:id',(req:Request,res:Response)=>{
    try{  
        const _id = Number(req.params.id)
        const dataMovie = getMovies().find((movie:any) => movie.id === _id)
        if(dataMovie){
            return res.status(200).send(dataMovie)
        }

        res.status(404).send("the movie is not found")       
    }
    catch(err : any) {
        res.status(500).send(err.message)
    }
})


///////////////////////////////////POST//////////////////////////////////////////
router.post('/movies',(req:Request,res:Response)=>{
    try {
        const reqBody = req.body
        const dataMovies:any[] = getMovies()
        const exists = typeof reqBody.title ==="string" && typeof reqBody.description==="string" 
                       && !isNaN(reqBody.year)

          const generateId = (dataMovies:any[]) => {
             const validId = dataMovies
                .map(movie => Number(movie.id))
                .filter(id => !isNaN(id))
              return validId.length ? Math.max(...validId) + 1 : 1
            }               

            const duplicatedData = dataMovies.filter((obj:any)=>{
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
        return res.status(400).send("The film is found!")
        
    }
    catch(err:any) {
        res.status(500).send(err.message)
    }
})

//////////////////////////////////////PATCH//////////////////////////////////////////
router.patch('/movies/:id',(req:Request, res:Response)=>{

    try {
            const _id = Number(req.params.id)
            const dataMovies:any[] = getMovies()
            const reqBody = req.body
            

            const indexMovie = dataMovies.findIndex(movie => movie.id === _id)

            if(indexMovie === -1) {
                return res.status(400).send("Movie is not found!!")
            }
            if(!reqBody.title) {
                return res.status(400).send("the title is required!")
                
            }
            if(!reqBody.description) {
                return res.status(400).send("the description is required!")
                
            } 
            if(isNaN(reqBody.year)){
                return res.status(400).send("the year is must number!")
            }
            
            dataMovies[indexMovie] = {
                ...dataMovies[indexMovie],
                ...reqBody
            }
             saveMovies(dataMovies)
             return res.status(200).send(dataMovies[indexMovie])

        } catch (err : any) {
            return res.status(500).send(err.message)
        }
})

////////////////////////////////////////DELETE////////////////////////////////// 

router.delete('/movies/:id',(req:Request, res:Response)=>{

    try {
            const _id = Number(req.params.id)
            const dataMovies:any[] = getMovies()

            const deleteMovie = dataMovies.filter((movie) => {
                return movie.id !== _id
            })

            saveMovies(deleteMovie)

            return res.status(200).send(deleteMovie)

        } catch (err:any) {
           return res.status(500).send(err.message)
    }
})

router.get('/movies/search=/:title',(req:Request,res:Response)=>{
    try{
        const title : string|string[] = req.params.title
        const dataMovies:any[] = getMovies()
        const data = dataMovies.filter(movie => movie.title === title)     
        if(data.length > 0) {  
            res.status(200).send(data)
        }
     } catch(err:any){
          res.status(500).send(err.message)
    }
})

////////////////////////////limit////////////////////////////

router.get('/movies/limit=/:num',(req:Request,res:Response)=>{

    try{
        const num = Number(req.params.num)
        const dataMovies:any[] = getMovies()
        const result:number[] = []
        if(num<=0) {
            return res.status(400).send("the num is invalid")
        }
        for(let movie = 0 ; movie>=num ; movie++){
            result.push(dataMovies[movie])  
        }
        return res.send(result)
    
        }catch(err:any){
          res.status(500).send(err.message)
    }

})
export default router