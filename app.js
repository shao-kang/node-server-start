const express =require('express');
const compression = require('compression');
const session = require('express-session');
const flash = require ('express-flash');
const expressValidator = require ('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const cookieParser = require('cookie-parser')
const bodyParser = require ('body-parser');
const logger = require ('morgan');
const chalk = require ('chalk');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const errorHandler = require('errorhandler');
const lusca =require('lusca');

/* load environment variables from .env file, where API keys and passwords are configured  */
/* dotenv.load({path:'.env.example'}); */

const app = express();

/* Express configuration */

app.set('port',process.env.PORT || 3000 );
app.use(express.static(path.join(__dirname,'public'),{maxAge:31557600000}));
//注册ejs 模板为html 简单的说就是原来以。ejs为后缀的模板页 现在可以是html了
/* app.engine('.html',require('ejs')); */
// 设置默认后缀名
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(logger('dev'));
app.use(expressStatusMonitor);
app.use(compression);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUnitialized: true,
  secret: process.env.SESSION_SECRET,
}))
/* app.use(flash()); */


//routers
app.get('/',(req,res) =>{
  res.render('index',{title: 'home'});
})


/* Error handleer */
app.use(errorHandler());
/* Start express server */
app.listen(app.get('port'),() => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
  
})
