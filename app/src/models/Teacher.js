// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library
import mongoose from "mongoose"
import shortiD from "shortid"
import {hashPassword} from "../helper"
// 2. قم بتحديد مخطط المدرس | start defining your user schema

const teacherSchema = new mongoose.Schema({
    name : String,
    email: {
        type : String,
        unique : true
    },
    pass: String,
    salt: String
})

// تخزين كلمة السر بعد عمل الهاش

teacherSchema.pre('save' , function(next) {
    if (!this.salt) {
        this.salt = shortiD.generate()
    } 
    if (this.pass) {
        this.pass = hashPassword(this.pass , this.salt)
    }
    next()
})

// 3. إنشاء نموذج المدرس | create  the user model

 const teacherModel = new mongoose.model('teacher' , teacherSchema)


// 4. تصدير الوحدة | export the module

export {
    teacherModel
}
