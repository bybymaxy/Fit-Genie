require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const axios = require('axios');
const cors = require('cors');
const openai = require('openai');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User } = require('./models/user');
const profileRoutes = require('./routes/profileRoutes');
const usersController = require('./controllers/api/usersController');
const controllers = require('./controllers/api/index');
const signupRoutes = require('./routes/signupRoutes');
const fitnessController = require('./controllers/api/fitnessController');
const apiRoutes = require('./routes/apiRoutes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

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
    db: sequelize,
  }),
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'controllers')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(controllers);
app.use(routes);

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

app.use('/profile', profileRoutes);
app.use('/api/users', usersController);

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
  ];
  res.json(users);
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

const openaiInstance = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let availableEngines;
(async () => {
  try {
    const response = await axios.get('https://api.openai.com/v1/engines', {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    availableEngines = response.data.data;
  } catch (error) {
    console.error('Error fetching available engines:', error);
  }
})();

app.post('/submitPrompts', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const latestEngine = availableEngines[0].id;
    const response = await axios.post(
      `https://api.openai.com/v1/engines/${latestEngine}/completions`,
      {
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
