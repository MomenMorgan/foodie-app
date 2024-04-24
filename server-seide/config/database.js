const mongoose = require('mongoose');

const dbConnection = async (app) => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`Database connected ${conn.connection.host}`);
    await app.listen(process.env.PORT, '0.0.0.0');
    console.log('Nodejs server started')
  }
  catch (error) {
    console.log(`Error ${error}`);
  }
};

module.exports = dbConnection;
