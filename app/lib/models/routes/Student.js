"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
// 2. قم بتحديد مخطط الطالب | start defining your user schema
const studentSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}); // 3. إنشاء نموذج الطالب | create  the user model

const studentModel = new _mongoose.default.model("student", studentSchema); // 4. تصدير الوحدة | export the module

var _default = studentModel;
exports.default = _default;