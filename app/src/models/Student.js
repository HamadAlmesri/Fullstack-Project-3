// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library
import mongoose from "mongoose"
import shortId from "shortid"
import {hashPassword} from "../helper.js"
// 2. قم بتحديد مخطط الطالب | start defining your user schema

const studentSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    pass: String,
    salt: String
})

studentSchema.pre('save' , function(next) {

    if(!this.salt) {
        this.salt = shortId.generate();
    }
    if(this.pass) {
        this.pass = hashPassword(this.pass , this.salt)
    }

    next()
})

// 3. إنشاء نموذج الطالب | create  the user model

const studentModel = new mongoose.model("student" , studentSchema)

// 4. تصدير الوحدة | export the module
export default studentModel