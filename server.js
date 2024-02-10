
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./src/routes/user-route');
const postRouter = require('./src/routes/post-route');
const PORT = 5000;
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use("/api/auth", userRouter)
app.use("/api/post", postRouter)

app.get('/', (req, res)=>{
    res.send('working')
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})