"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _route = _interopRequireDefault(require("./routes/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  استيراد المكتبات المطلوبة | import the required libraries
//  تأكد من تنزيل الوحدات المطلوبة | make sure to download the required modules
const db = "1schoolDB";

const start = async () => {
  await _mongoose.default.connect("mongodb://localhost:27017/".concat(db), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  try {
    console.log("Successfully connected to ".concat(db, " , creating app"));
    const app = (0, _express.default)();
    app.use(_bodyParser.default.urlencoded({
      extended: true
    }));
    console.log("App created Successfully , Setting the routes");
    (0, _route.default)(app);
    console.log("Routes was set , Listening to port 3000");
    app.listen(3000, () => {
      console.log("Server is working on port 3000");
    });
  } catch (error) {
    console.log("There is an error while creating the app ".concat(error));
  }
};

start(); // لا تنسى تحديد وظيفة الخادم | don't forget to define the server function that listens to requests