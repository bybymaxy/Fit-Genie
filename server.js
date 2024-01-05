const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const axios = require('axios');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const usersController = require('./controllers/api/usersController');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const getUsers = require('./controllers/api/usersController');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    const response = await axios.get('https://wger.de/api/v2/exercise/');
    req.wgerData = response.data;
    next();
  } catch (error) {
    console.error('Error fetching data from Wger API:', error);
    next(error);
  }
});

app.use('/api/users', usersController); // Add this line for the "/api/users" route

app.get('/api/users', getUsers);

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});