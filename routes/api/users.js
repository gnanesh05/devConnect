const express = require('express');
const router  = express.Router();
const User = require('../../models/Users');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
const config = require('config');
//add user route
router.post('/',
[
 check('name', 'Name is required').not().isEmpty(),
 check('email',"Include a valid Email").isEmail(),
 check('password','Please enter a password with atleast 6 characters').isLength({min:6})
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;
    
    try
    {
      let user = await User.findOne({email});
      if(user)
      {
         return  res.status(400).json({errors: [{'msg':'user already exists'}]});
      }

      const avatar = gravatar.url(email,{
          s: '200',
          r: 'pg',
          d: 'mm'
      })

      user = new User({
          name,
          email,
          avatar,
          password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);
      await user.save();

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