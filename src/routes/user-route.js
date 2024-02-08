const express = require('express');
const {handleRegister} = require('../controller/user.controller')
const router = express.Router();

router.get("/see", (req, res)=>{
    res.send("working")
})


router.post("/create-account", handleRegister)

module.exports = router;
