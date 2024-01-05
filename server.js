const openai = require('openai');
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const axios = require('axios');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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
    db: sequelize,
  }),
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

// Add the submit-prompt route
app.post('./submit-prompts', async (req, res) => {
  const openaiInstance = new openai.OpenAI();

  // Retrieve the prompt from the request body
  const prompt = req.body.prompt;

  // Generate response using OpenAI
  const response = await openaiInstance.generateText(prompt);

  // Send the response back to the client
  res.json({ response: response.data.text });
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});