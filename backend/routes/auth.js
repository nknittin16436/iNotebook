const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser')

// JWT SIGNATURE 
const JWT_SECRET = "HiIamNkNittin";




// ROUTE 1: CREATE A USER USING POST:"/api/auth/createuser".  No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
],
  async (req, res) => {
     let success=false;
    // WITHOUT VALIDATION
    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
    // res.send(req.body);



    // AFTER THE VALIDATION CODE
    //  IF ERROE IN INPUT BY USER RETURN ERROR CODE 400 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }


    // SAVING USER DATA INTO DATABASE


    //*******oNE METHOD WITHOUT ASYN AWAIT WITH INDEXES IN User.js */
    //   User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //   }).then(user => res.json(user)).
    //   catch(err=>{console.log(err)
    //  res.json({error:"Please enter a unique value",message:err.message})
    //  })
    //  //  res.send(req.body);




    // **********************WITHOUT INDEXES IN User.js WITH ASYNC AWIT*******************//

    //USING TRY CATCH IN THE END

    // try {

    // // CHECK WITH EMAIL USER ALREADY EXIST OR NOT
    // let user= await User.findOne({email:req.body.email});
    // if(user){
    //   return res.status(400).json({error:"Sorry email already exist"});
    // }
    //  user=await  User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //   })
    // //   .then(user => res.json(user)).
    // //   catch(err=>{console.log(err)
    // //  res.json({error:"Please enter a unique value",message:err.message})
    // //  })
    // // res.json({"nice":"Registerer succefully"});
    // res.json(user);
    // } catch (error) {
    //      console.error(error.message);
    //      res.status(500).send("some error occured");
    // }





    // ************NOW HASHING THE PASSSWORD************************************//


    try {

      // CHECK WITH EMAIL USER ALREADY EXIST OR NOT
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      })
      const data = {
        user: user.id
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData);
   success=true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }

  });




/*********************AUTHENTICATE A USER USING POST:api/auth/login************************/
// ROUTE 2:LOGIN OF USER /api/auth/login
router.post('/login',
  [
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success=false;
 //  IF ERROE IN INPUT BY USER RETURN ERROR CODE 400 
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ success,errors: errors.array() });
 }


 
 const {email,password}=req.body;

 try {
   let user= await User.findOne({email});

   if(!user){
     success=false;
     return res.status(400).json({success,'error':"Please Enter correct Credentials"});
   }



   const passwordCompare= await bcrypt.compare(password,user.password);

   if(!passwordCompare){
     success=false;
    return res.status(400).json({success,'error':"Please Enter correct Credentials"});
   }

   const data = {
    user:{
      
      id: user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRET);
  success=true;
  res.json({ success,authToken });






 } catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured");
 }
  })




  // ROUTE 3:DETAILS OF LOGGEDIN USER DETAIL localhost:5000/api/auth/getuser

  router.post('/getuser',fetchUser,
  async (req, res) => {
  try {
   const userId=req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
   }

  })
 module.exports = router;