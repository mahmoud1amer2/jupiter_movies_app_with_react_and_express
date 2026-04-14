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

module.exports=router