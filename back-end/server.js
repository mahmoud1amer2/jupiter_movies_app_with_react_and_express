const express = require("express")
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

app.get('/test',(req,res)=>{
    res.send('the server is working')
})



app.listen(port,()=> {
   console.log(`The server is lisiting on port ${port}`)
})