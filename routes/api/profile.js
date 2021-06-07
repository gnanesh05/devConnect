const express = require('express');
const router  = express.Router();
const request = require('request');
const config = require('config');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

//profile route
router.get('/me', auth ,async (req,res)=>{

    try{
     const profile = await Profile.findOne({user: req.user.id}).populate('user',['name', 'avatar']);
     
     if(!profile)
     {
         return res.status(400).json({msg: "No profile found"});
     }
     return res.json(profile);
    }
    catch(err)
    {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
    res.send("user route check");

})

//create or update

router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills', 'Skills are Required').not().isEmpty()

]] ,async(req,res)=>{
   
    
        const errors = validationResult(req);
        if(!errors.isEmpty())
         {
             return res.status(400).json({errors: errors.array()});
         }

         const {
             company,
             website,
             location,
             bio,
             status,
             githubusername,
             skills,
             youtube,
             facebook,
             twitter,
             instagram,
             linkedin
         } = req.body;

         const profileFields = {};
         profileFields.user = req.user.id;
         if(company) profileFields.company = company;
         if(location) profileFields.location = location
         if(website) profileFields.website = website;
         if(bio) profileFields.bio = bio;
         if(status) profileFields.status = status;
         if(githubusername) profileFields.githubusername = githubusername;
         
         if(skills)
         {
             profileFields.skills = skills.split(',').map(skill =>skill.trim());
         }

         profileFields.social = {};
         if(youtube) profileFields.social.youtube = youtube;
         if(facebook) profileFields.social.facebook = facebook;
         if(twitter) profileFields.social.twitter = twitter;
         if(instagram) profileFields.social.instagram = instagram;
         if(linkedin) profileFields.social.linkedin = linkedin;

         console.log(profileFields);
         //res.send("hello");
         
    try
    {
        let profile = await Profile.findOne({user:req.user.id});
        //update
        if(profile)
        {
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            )

            return res.json(profile);
        }

        //create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    }
    catch(err)
    {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
})

//Get Profiles
 router.get("/",async(req,res)=>{
     try {
      
        const profiles = await Profile.find().populate('user',['name', 'avatar']);
        return res.json(profiles);
         
     } catch (error) {
         console.error(error.message);
         res.status(500).send("Server error");
         
     }
 })

 //Get Specific Profile

 router.get("/user/:user_id",async(req,res)=>{
    try {
     
       const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name', 'avatar']);
       if(!profile)
       {
           return res.status(400).json({msg:"No Profile Found"});
       }
       return res.json(profile);
        
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId')
            return res.status(400).json({msg:"No Profile Found"});

        res.status(500).send("Server error");
        
    }
})


//DELETE PROFILE & USER

router.delete("/",auth,async(req,res)=>{
    try {
     
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});
        return res.json({msg:'User Deleted'});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
        
    }
})

// PUT REQUEST TO ADD EXPERIENCE
 router.put("/experience",[auth,[
     check("title","Title is required").not().isEmpty(),
     check("company","Company is required").not().isEmpty(),
     check("from","from data is required").not().isEmpty()
 ]], async(req,res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty())
     {
         return res.status(400).json({errors: errors.array()});

     }

     const {
         title,
         company,
         location,
         from,
         to,
         current,
         description
     } = req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      };
      try 
      {
         const profile = await Profile.findOne({user: req.user.id});
         profile.experience.unshift(newExp);
         await profile.save();
         return res.json(profile);   
      } 
      catch (error) {
          console.error(error.message);
          res.status(500).send("Server Error");
          
      }
 })

 //delete experience

 router.delete("/experience/:exp_id",auth, async(req,res)=>{

    try {
        const profile = await Profile.findOne({user: req.user.id});

        //get remove index;
        const removeIndex = profile.experience
                                   .map(item=>item.id)
                                   .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        return res.json(profile);
        
    } catch (error) {
        console.error(error.message);
          res.status(500).send("Server Error");
        
    }

 })

 // PUT REQUEST TO ADD EDUCATION
 router.put(
    '/education',
    auth,
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        degree,
        school,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

     const newExp = {
       school,
       degree,
       fieldofstudy,
       from,
       to,
       current,
       description
     };
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.education.unshift(newExp);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  

//delete education

router.delete("/education/:edu_id",auth, async(req,res)=>{

   try {
       const profile = await Profile.findOne({user: req.user.id});

       //get remove index;
       const removeIndex = profile.education
                                  .map(item=>item.id)
                                  .indexOf(req.params.edu_id);

       profile.education.splice(removeIndex, 1);

       await profile.save();

       return res.json(profile);
       
   } catch (error) {
       console.error(error.message);
         res.status(500).send("Server Error");
       
   }

})

//ADD GITHUB REPOSTERIES

router.get("/github/:username", (req,res)=>{
    try {

        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        }

        request(options,(err, response, body)=>{
            if(err)
              console.error(err);
            
            if(response.statusCode !==200)
              return res.status(404).json({msg:"No Github Profile Found"})
            
            res.json(JSON.parse(body));

        })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
        
    }
})
module.exports  = router;