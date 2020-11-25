// في هذا الملف ، قم بإعداد طرق التطبيق الخاصة بك | in this file, set up your application routes

// 1. استيراد وحدةالمدرس | import the teacher module
// 2. استيراد وحدة الطالب | import the student module
import studentModel from "../models/Student"
import {teacherModel} from "../models/Teacher"
import {hashPassword} from "../helper"
import jwt from "jsonwebtoken"
import joi from "joi"



const setupRoutes = (app) => {
    // 3. تسجيل طالب جديد و تخزين بياناته | new student sign up
  app.post("/student/register", async (req, res) => {
    const {name , email , pass} = req.body ; 
        
    const bodySchema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      pass: joi.string().min(6).max(12).required()
    })
    const validationResult = bodySchema.validate(req.body)

    try {

        const newStudent = new studentModel({
            name,
            email,
            pass
        })
        if(validationResult.error) {
          res.statusCode = 401 ;
          res.send(`There is an error ${validationResult.error.details[0].message}`)
        } else {
          await newStudent.save()
          res.send(`Account created, Welcome student ${newStudent.name}  !!`)
        }

    } catch (error) {
        res.send(error.message)
    }

  });
    // 4. تسجيل دخول الطالب  | student login 
  app.post("/student/login", async(req, res) => {
    const { email , pass } = req.body ; 
    try {
      const student = await studentModel.findOne({email})
      if(!student) {
        res.send('No account found !!')
      } else if (student.pass === hashPassword(pass , student.salt)){
        res.send(`Welcome ${student.name} !!`)
      } else {
        res.statusCode = 401
        res.send('Your password is wrong')
      }
    } catch (error) {
      console.log(error);
    }

  });
    // 4. تسجيل معلم جديد  | student registter 
  app.post("/teacher/register", async(req, res) => {
    const {name , email , pass} = req.body
    const bodySchema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      pass: joi.string().min(6).max(12).required()
    })
    const validationResult = bodySchema.validate(req.body)

    try {
      const newTeacher = new teacherModel({
        name,
        email,
        pass
      })
      if(validationResult.error) {
        res.statusCode = 400 ;
      res.send(`There is an error ${validationResult.error.details[0].message}`)
    } else {
      await newTeacher.save()
      res.send(`Teacher's account created : ${newTeacher.name} !!`)
    }
    } catch (error){
      res.statusCode = 401 ;
      res.send(error.message)
    }
  })
// 4. تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token
  app.post("/teacher/login", async(req, res) => {
    const {email , pass} = req.body ; 
    try {
      const teacher = await teacherModel.findOne({email})
      if(!teacher) {
        res.statusCode = 401
        res.send('No account found')
      } else if (teacher.pass === hashPassword(pass , teacher.salt)) {
        const token = jwt.sign({ sub: teacher._id}, teacher.salt , {expiresIn: 60*15})
        res.statusCode = 200 
          res.send(`Welcome teacher !! ${teacher.name} `  + `\n Your access token to your students is : ${token}`)
      } else {
        res.statusCode = 401
        res.send('Wrong password')
      }
    } catch (error) {
      res.statusCode = 401 ;
      res.send(error.message)
    }
  });
  // 5. إعداد طرق مختلفة | setup the different routes (get, post, put, delete)
  app.get("/teacher/students" , async(req , res) => {

    const token = await req.headers.authorization;

    try {
      const decodedToken = jwt.decode(token)
      const teachers = await teacherModel.findById(decodedToken.sub)
      const students = await studentModel.find({})
      jwt.verify(token , teachers.salt)
      if(!token) {
        res.statusCode = 401 ;
        res.send("you have to permissions")
      }
      if(!teachers) {
        res.statusCode= 401 ;
        res.send("you have to permissions")
      } else {
        res.send(`Your students are : \n` + students.map((meow) => meow.name + " || email : " + meow.email).join(`\n`))
      }
    } catch (error) {
      res.statusCode = 401;
      res.send(`There is an error !! ${error.message}`)
    }

  })

  app.delete('/teacher/students/delete/:email' , async(req , res) => {
    const {email} = req.params ;
    console.log(email);
    const student = await studentModel.deleteOne({ email });
    try {
      if(!student) {
        res.statusCode = 400 ;
        res.send("No account was deleted !!")
      } else if (student.deletedCount !== 0 ) {
        res.send(`Account deleted !! \n ${email} was deleted !!`)
      } else {
        res.statusCode = 400 ;
        res.send("Wrong email or the email was deleted");
      }
    } catch (error) {
      res.statusCode = 401 ;
      res.send(error.message);
    }
  })
  app.put('/teacher/students/edit/:email/:newEmail' , async(req , res) => {
    const {email , newEmail} = req.params


    try {

      const student = await studentModel.updateOne({email} , {email : newEmail})

      if(!student) {
        res.statusCode = 400 ;
        res.send('There is no account with this email')
      } else {
        res.send(`Email Changed to ${newEmail} !! `)
      }

    } catch (error) {
      res.statusCode = 400 ;
      res.send(`There is an error while changing the email, \n Pro tip : you cant set 2 account with the same email !!`)
    }
  })
};



// 3. تصدير الوحدة | export the module
export default setupRoutes;
