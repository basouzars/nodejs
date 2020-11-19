require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Cors
const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('view engine', 'handlebars');

app.listen(8080, () => {
  console.log('hellow world');
});
