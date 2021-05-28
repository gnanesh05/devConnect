const express = require('express');
const router  = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator/check');
const config = require('config');


//test route
router.get('/',auth, async(req,res)=>{
    try
    {
       const user = await User.findById(req.user.id).select('-password');
       res.json({user});
    }
    catch(err)
    {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})

//login

router.post('/',
[
 
 check('email',"Include a valid Email").isEmail(),
 check('password','Password is missing').exists()
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    
    try
    {
      let user = await User.findOne({email});
      if(!user)
      {
         return  res.status(400).json({errors: [{'msg':'Invalid Credentials'}]});
      }

     const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    {
        return  res.status(400).json({errors: [{'msg':'Invalid Credentials'}]});    
    }
      const payload = {
          user:{
              id: user.id
          }
      }
      jwt.sign(payload,
         config.get('JwtSecret'),
         {expiresIn: 36000},
         (err, token)=>{
            if(err)
              throw err;
            else
            res.json({token})
         }
         );


     // res.send("user saved");

    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send("Server Error");
    }

    //res.send("user route check");
})
module.exports  = router;