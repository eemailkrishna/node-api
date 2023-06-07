const express = require('express');
const { handle } = require('./middleware/error');
const config = require('./config/config');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));


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
   
    