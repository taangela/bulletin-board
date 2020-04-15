const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const uniqid = require('uniqid');
const postsRoutes = require('./routes/posts.routes');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

passport.use(new GoogleStrategy({
  clientID: '647806754186-f4uv9rj99kniul7p5rk0p0u933of6241.apps.googleusercontent.com',
  clientSecret: 'r5yRvd_8TwJGjwF0gEsR9-pV',
  callbackURL: 'http://localhost:8000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
done(null, profile);
console.log(profile);
}));

app.use(session({ secret: 'info' }));
app.use(passport.initialize());
app.use(passport.session());

//serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

/* MIDDLEWARE */
app.use(cors());
app.use(formidable({ uploadDir: '../public/uploads/' }, [{
  event: 'fileBegin', // on every file upload...
    action: (req, res, next, name, file) => {
      console.log("inside file upload");
      const fileName = uniqid() + '.' + file.name.split('.')[1];
      file.path = __dirname + '/../public/uploads/photo_' + fileName; // ...move the file to public/uploads with unique name
    }
  },
]));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, '../public')));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));


app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/');
  }
);


//app.get('/api/is_authenticated', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),

app.get('/api/is_authenticated', 
  (req, res) => {
    if(req.isAuthenticated()) {
      res.send(req.user.username);
    } else {
      res.send("not_auth");
    }
  }
);
/* API ENDPOINTS */
app.use('/api', postsRoutes);

app.get('/api/logout', 
  (req, res) => {
    req.logout();
    res.redirect('/');
  }
);


/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});



/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
