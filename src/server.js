
const express = require('express')
const cors = require('cors');
const userRouter = require('./routes/user-route');
const PORT = 5000;
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/auth", userRouter)

app.get('/', (req, res)=>{
    res.send('working')
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})