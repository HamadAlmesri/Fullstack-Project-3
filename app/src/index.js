//  استيراد المكتبات المطلوبة | import the required libraries
//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import setupRoutes from "./routes/route"


const db = "1schoolDB"

const start  = async() => {
    await mongoose.connect(`mongodb://localhost:27017/${db}`,
    {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true})

    try {
        console.log(`Successfully connected to ${db} , creating app`);
        const app = express()
        app.use(bodyParser.urlencoded({extended : true}))
        console.log(`App created Successfully , Setting the routes`);
        setupRoutes(app)
        console.log(`Routes was set , Listening to port 3000`);
        app.listen(3000 , () => {
            console.log("Server is working on port 3000")
        })
    } catch (error) {
        console.log(`There is an error while creating the app ${error}`);
    }

}
start()



// لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests