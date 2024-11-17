const express = require('express');
const { handle } = require('./middleware/error');
const config = require('./config/config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cookieParser());

const swaggerFilePath = './swagger-output.json';
if (fs.existsSync(swaggerFilePath)) {
  const swaggerDocument = require(swaggerFilePath);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.warn('Warning: swagger-output.json file not found. Generate it by running `node swagger.js`.');
}



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/transport', require('./routes/transport'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/material-purchase', require('./routes/purchase'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/land-management', require('./routes/landManagement'));
// app.use('/api', require('./routes/routes/purchase'));







app.post('/login11', async (req, res) => {
  // Authenticate the user and retrieve their user ID
  // const userId = await authenticateUser(req.body.username, req.body.password);

  // Store the user ID in the session
  req.session.userId ='krishna';
  const userId = req.session.userId;

  // Redirect the user to the dashboard
  res.send(userId);
});

app.get('/logout', (req, res) => {
    // res.send(req.body);
    // const userId = req.params.id;/
    // delete req.user;
    // delete req.session.id;
    // req.session.user = null;
    // remove the token from the client-side storage or mark it as invalid
    // const token = req.headers.authorization.split(' ')[1];
    // or
    // localStorage.removeItem('token'); // for local storage
    res.send({'message':'logout'});
    // redirect to the login page or send a success message
    // res.redirect('/login');
  });

app.use(handle);

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
    });
   
    