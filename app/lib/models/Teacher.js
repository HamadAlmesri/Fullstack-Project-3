"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teacherModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _shortid = _interopRequireDefault(require("shortid"));

var _helper = require("../helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
// 2. قم بتحديد مخطط المدرس | start defining your user schema
const teacherSchema = new _mongoose.default.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  pass: String,
  salt: String
}); // تخزين كلمة السر بعد عمل الهاش

teacherSchema.pre('save', function (next) {
  if (!this.salt) {
    this.salt = _shortid.default.generate();
  }

  if (this.pass) {
    this.pass = (0, _helper.hashPassword)(this.pass, this.salt);
  }

  next();
}); // 3. إنشاء نموذج المدرس | create  the user model

const teacherModel = new _mongoose.default.model('teacher', teacherSchema); // 4. تصدير الوحدة | export the module

exports.teacherModel = teacherModel;