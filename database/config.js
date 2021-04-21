const mongoose = require('mongoose');

const dbconnection = async() => {

  try {
    
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('Connection to database success');


  } catch (err) {
    console.log(err);
    throw new Error('Database error')
  }
}


module.exports = {
  dbconnection
}