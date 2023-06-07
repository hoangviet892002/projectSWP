const express = require('express');
const session = require('express-session');
const authController = require('./controllers/authController');
const db = require('./db');
const router = express.Router();

const app = express();
const port = 3000;

// Thiết lập session
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
);





// Thiết lập middleware để parse dữ liệu từ form
app.use(express.urlencoded({ extended: true }));

// Thiết lập views
app.set('view engine', 'ejs');

// Thiết lập routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', authController.register);

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', authController.login);

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});



app.get('/logout', authController.logout);

// Kết nối cơ sở dữ liệu và khởi động server
db.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
  

