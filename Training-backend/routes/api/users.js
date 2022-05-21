const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load all model
const User = require('../../models/User');
const Schedule = require("../../models/scheduleSchema");
const Course = require("../../models/courseSchema")
const Trainer = require("../../models/trainerSchema")




//Post Router api/users/register
Router.post('/register', (req, res) => {
    //Form Validation
    //Destructuring Values
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: "Email already exists"
                });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                //Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user)
                                // res.redirect('/users/login')
                            )
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

//Post Router api/users/login

Router.post('/login', (req, res) => {
    //Login Validation
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    console.log(errors)
    console.log(isValid)
    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find User By Email
    User.findOne({
        email:email
    }).then(user => {
        //Check if Your Exists
        if (!user) {
            return res.status(404).json({
                emailNotFound: "Email is not registered"
            });
        }

        //Match Password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    //User Matched
                    //Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    //Sign Token
                    jwt.sign(payload, config.get('secretOrKey'), {
                        expiresIn: 2628002 //  1 month in second
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    });
                } else {
                    return res.status(400).json({
                        passwordIncorrect: "Password incorrect"
                    });
                }
            });
    });
});

//Inserting a new Schedule

Router.post("/dashboard/schedule", async (req, res) => {
    console.log(req.body)
   const {
     course,
     trainer_name,
     date,
     starting_time,
     ending_time,
     fee_amount,
     disc_amount,
     batch_size
   } = await req.body;
 
 
   console.log("type of date in backend :" + typeof(date))
   if (
     !course ||
     !trainer_name ||
     !date ||
     !starting_time ||
     !ending_time ||
     !fee_amount ||
     !disc_amount ||
     !batch_size
   ) {
     res.status(422).json("Please fill all the data")
   }
 
   Schedule.findOne({course: course, trainer_name: trainer_name, 
      starting_time: starting_time, ending_time: ending_time
   }).then(function(err, data){
     console.log(data)
     if(err){
       console.log("we cannot insert duplicate data")
       res.status(421).json("cannot fill duplicate Schedule")
     }
     else {
       console.log("we can insert ")
 
   try {
     const addSchedule = new Schedule({
       course,
       trainer_name,
       date,
       starting_time,
       ending_time,
       fee_amount,
       disc_amount,
       batch_size
     })
 
      addSchedule.save()
      .then(savedSchedule => 
       res.status(201).json(savedSchedule))
      .catch(err => console.log("error"))
     // res.status(201).json(addSchedule)
     console.log(addSchedule)
   } catch (error) {											
     throw error
   }
     }
   }).catch((error)=>{
     console.log(error)
   })
 
     
 
 });
 
 //get Schedule
 Router.get("/dashboard/getSchedule", async(req, res)=>{
    
   try{
     const scheduleData = await Schedule.find()
     res.status(201).json(scheduleData)
     console.log(scheduleData)
   } catch(error) {
     res.status(404).json(error)
   }
 })
 
 //get individual schedule
 Router.get("/dashboard/getSchedule/:id", async(req,res)=>{
   try {
     // console.log(req.params)
     const {id} = req.params
 
     const individualSchedule= await Schedule.findById({_id:id})
     console.log(individualSchedule)
     res.status(201).json(individualSchedule)
     
   } catch (error) {
     res.status(422).json(error)
   }
 })
 
 
 Router.patch("/dashboard/updateSchedule/:id", async(req, res)=>{
   try {
     const {id} = req.params
     const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {
       new: true
     }) 
     console.log(updatedSchedule)
     res.status(201).json(updatedSchedule)
   } catch (error) {
 
     res.status(422).json(error)
   }
 
 })
 
 //delete Schedule
 Router.delete("/dashboard/deleteSchedule/:id", async(req, res)=>{
   try {
     const {id} = req.params
     const deleteSchedule = await Schedule.findByIdAndDelete({_id:id}) 
     console.log(deleteSchedule)
     res.status(201).json(deleteSchedule)
   } catch (error) {
 
     res.status(422).json(error)
   }
 })
 
 
 //Inserting a new course
 
 Router.post("/dashboard/course", async (req, res) => {
   console.log(req.body)
  const {
    course,
     desc,
     cat,
     int_aud,
     benefits,
     trainer_name
  } = req.body;
  if (
   !course ||
   !desc ||
   !cat ||
   !int_aud ||
   !benefits ||
   !trainer_name
  ) {
   //  alert("Please fill all the data")
    res.status(422).json("Please fill all the data")
  }
  try {
    const addCourse = new Course({
     course,
     desc,
     cat,
     int_aud,
     benefits,
     trainer_name
    })
 
    await addCourse.save();
    res.status(201).json(addCourse)
    console.log(addCourse)
  } catch (error) {											
    throw error
  }
 });
 
 //get course
 Router.get("/dashboard/getCourse", async(req, res)=>{
   try{
     const courseData = await Course.find()
     res.status(201).json(courseData)
     console.log(courseData)
   } catch(error) {
     res.status(404).json(error)
   }
 })
 
 
 //get a specific course
 Router.get("/dashboard/getCourse/:id", async(req,res)=>{
   try {
     console.log(req.params)
     const {id} = req.params
 
     const individualCourse= await Course.findById({_id:id})
     console.log(individualCourse)
     res.status(201).json(individualCourse)
     
   } catch (error) {
     res.status(422).json(error)
   }
 })
 
 
 //update a course
 Router.patch("/dashboard/updateCourse/:id", async(req, res)=>{
   try {
     const {id} = req.params
     const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
       new: true
     }) 
     console.log(updatedCourse)
     res.status(201).json(updatedCourse)
   } catch (error) {
 
     res.status(422).json(error)
   }
 })
 
 
 //delete a course
 Router.delete("/dashboard/deleteCourse/:id", async(req, res)=>{
   try {
     const {id} = req.params
     const deleteCourse = await Course.findByIdAndDelete({_id:id}) 
     console.log(deleteCourse)
     res.status(201).json(deleteCourse)
   } catch (error) {
 
     res.status(422).json(deleteCourse)
   }
 })
 
 //insert new trainer
 
 Router.post("/dashboard/trainer", async (req, res) => {
   console.log(req.body)
  const {
   name,
   qualif,
   short_desc,
   yoe
  } = req.body;
  if (
    !name || !qualif || !short_desc || !yoe
  ) {
    res.status(422).json("Please fill all the data")
  }
  try {
    const addTrainer = new Trainer({
     name,
     qualif,
     short_desc,
     yoe
    })
 
    await addTrainer.save();
    res.status(201).json(addTrainer)
    console.log(addTrainer)
  } catch (error) {											
    throw error
  }
 });
 
 //get all trainers
 
 Router.get("/dashboard/getTrainer", async(req, res)=>{
   try{
     const trainerData = await Trainer.find()
     res.status(201).json(trainerData)
     console.log(trainerData)
   } catch(error) {
     res.status(404).json(error)
   }
 })
 
 
 //Show a specific trainer
 Router.get("/dashboard/getTrainer/:id", async(req,res)=>{
   try {
     // console.log(req.params)
     const {id} = req.params
 
     const individualTrainer= await Trainer.findById({_id:id})
     console.log(individualTrainer)
     res.status(201).json(individualTrainer)
     
   } catch (error) {
     res.status(422).json(error)
   }
 })
 
 //edit a trainer
 Router.patch("/dashboard/updateTrainer/:id", async(req, res)=>{
   try {
     const {id} = req.params
     const updatedTrainer = await Trainer.findByIdAndUpdate(id, req.body, {
       new: true
     }) 
     console.log(updatedTrainer)
     res.status(201).json(updatedTrainer)
   } catch (error) {
 
     res.status(422).json(error)
   }
 })
 
 //delete a trainer
 Router.delete("/dashboard/deleteTrainer/:id", async(req, res)=>{
   try {
     const {id} = req.params
     const deleteTrainer = await Trainer.findByIdAndDelete({_id:id}) 
     console.log(deleteTrainer)
     res.status(201).json(deleteTrainer)
   } catch (error) {
 
     res.status(422).json(deleteTrainer)
   }
 })
 

module.exports = Router;




// const express = require('express');
// const Router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');

// //Load Input Validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

// // Load User model
// const User = require('../../models/User');

// //Post Router api/users/register
// Router.post('/register', (req, res) => {
//     //Form Validation
//     //Destructuring Values
//     const {
//         errors,
//         isValid
//     } = validateRegisterInput(req.body);

//     //Check Validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     User.findOne({
//             email: req.body.email
//         })
//         .then(user => {
//             if (user) {
//                 return res.status(400).json({
//                     email: "Email already exists"
//                 });
//             } else {
//                 const newUser = new User({
//                     name: req.body.name,
//                     email: req.body.email,
//                     password: req.body.password
//                 });

//                 //Hash password before saving in database
//                 bcrypt.genSalt(10, (err, salt) => {
//                     bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if (err) throw err;
//                         newUser.password = hash;
//                         newUser.save()
//                             .then(user => res.json(user)
//                                 // res.redirect('/users/login')
//                             )
//                             .catch(err => console.log(err));
//                     });
//                 });
//             }
//         });
// });

// //Post Router api/users/login

// Router.post('/login', (req, res) => {
//     //Login Validation
//     const {
//         errors,
//         isValid
//     } = validateLoginInput(req.body);

//     //Check Validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     const email = req.body.email;
//     const password = req.body.password;

//     //Find User By Email
//     User.findOne({
//         email:email
//     }).then(user => {
//         //Check if Your Exists
//         if (!user) {
//             return res.status(404).json({
//                 emailNotFound: "Email is not registered"
//             });
//         }

//         //Match Password
//         bcrypt.compare(password, user.password)
//             .then(isMatch => {
//                 if (isMatch) {
//                     //User Matched
//                     //Create JWT Payload
//                     const payload = {
//                         id: user.id,
//                         name: user.name
//                     };

//                     //Sign Token
//                     jwt.sign(payload, config.get('secretOrKey'), {
//                         expiresIn: 63113852 //2 years in seconds    ‬
//                     }, (err, token) => {
//                         res.json({
//                             success: true,
//                             token: "Bearer" + token
//                         });
//                     });
//                 } else {
//                     return res.status(400).json({
//                         passwordIncorrect: "Password incorrect"
//                     });
//                 }
//             });
//     });
// });

// module.exports = Router;