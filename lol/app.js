const path = require('path');

const express = require('express');
const dotenv = require('dotenv');


const authRoutes = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoute');
const subCategoryRoutes = require('./routes/subCategoryRoute');
const recipeRoutes = require('./routes/recipeRoute');
const userRoutes = require('./routes/userRoute');
const collectionRoute = require('./routes/collectionRoute');
const reviewRoute = require('./routes/reviewRoute');
const dbConnection = require('./config/database');
const errorHelper = require('./utils/error');
const globalError = require('./middlewares/errorMiddleware');

dotenv.config({ path: 'config.env' });

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(authRoutes);
app.use('/categories', categoryRoutes);
app.use('/subcategories', subCategoryRoutes);
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);
app.use('/collections', collectionRoute);
app.use('/reviews', reviewRoute);

app.all('*', () => {
  errorHelper('404 Not found', 404);
});

app.use(globalError);

dbConnection(app);
