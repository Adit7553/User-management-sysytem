// for use express
const express = require('express')
const app = express();

// to use  path model
const path = require('path')

// to use ejs middleware
const ejs = require("ejs")

// to load static file from public folder
app.use('/img', express.static(path.join(__dirname, "/public/css")))
const staticpath = path.join(__dirname, "/public")
app.use(express.static(staticpath))


//to use body-parser
const bodyParser = require('body-parser') 

//to import config file data
const config = require('./config/config')

//to import authentication file 
const auth = require('./middleware/auth')

// to store session in mongodb by which once a user login ,the session will store in mongodb database and then for a
// specific time provided by us , user can access the welcome page without login again.

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/useManagementSystem',
    collection: 'mySessions'
  });
  
  // Catch errors
  store.on('error', function(error) {
    console.log(error);
  });
  
  app.use(require('express-session')({
    secret: config.secretSession,
    cookie: {
      maxAge: 1000 * 60 *60 // 
    },
    store: store,
    resave: true,
    saveUninitialized: true
  }));
  

//to require multer that uses to upload file in reistration form
const multer = require('multer')

//to use multer
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname, '/public/userImages'));
     },
    filename : function(req,file,cb){  
       cb(null,file.originalname);
    }
})
const upload = multer({storage})


//use body-parser for registration system
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// to connect with controllers folder
const registerUser = require('./controllers/resigterUser')
const verifyByEmail = require('./controllers/verifyByEmail')
const forgetAndReset = require('./controllers/forgetAndReset')
const loginVerification = require('./controllers/loginVerification')
const updateProfile = require('./controllers/updateProfile')
const userProfile = require('./controllers/userProfile')

// to connect with the database 
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user-management-system')


//to use view engine
const tempPath = path.join(__dirname, "/views/users")
app.set('view engine', 'ejs')
app.set('views', tempPath)



// get request to load registration page
app.get('/register',auth.isLogout,registerUser.loadRegisterPage) 

//get request to load login page as a home page and as /login page
app.get('/login',auth.isLogout, loginVerification.loadLoginPage)
app.get('/', loginVerification.loadLoginPage)

//to get welcome page after successfull login
app.get("/welcomePages",auth.isLogin, loginVerification.welcomePage)

//to get logout page
app.get("/logout", auth.isLogin, loginVerification.userLogout )

// to get forget and reset password page
app.get('/forget', auth.isLogout, forgetAndReset.forgetPassword)

// post request to insert new user by filling registration form
//app.post('/register',upload.single('image'), registerUser.insertUser)
app.post('/register',upload.single('image'), registerUser.insertUser)

app.post('/forget', auth.isLogout, forgetAndReset.resetPassword )
// to verify users who comes to login
app.post("/login", loginVerification.verifyLoginUser)

// get request to load email-vefify page after verify user email
app.get('/verify', verifyByEmail.verifyMail)

// to get reset Page when email is sent
app.get('/resetPage',forgetAndReset.goForResetPage)

// to get reset verify page when email is sent and user click on verify link
app.get('/resetVerified', forgetAndReset.resetVerified)


//to get user profile page
app.get('/showUserProfile',userProfile.showUserProfile)

// to fetch user data
app.get('/fetchProfile',userProfile.fetchProfile)

// to update user mobile number
app.post('/editProfile',updateProfile.editProfile)

app.post('/updatePassword', forgetAndReset.resetResponse)


// connect this app to a port for run this on the local server
const port = process.env.port || 9000
app.listen(port, ()=>{
    console.log(`Server is successfully running at http://127.0.0.1:${port}`);
})