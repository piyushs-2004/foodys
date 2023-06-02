const mongoose = require('mongoose');
const {jwtSecret,mongoURI}= require('./config/keys')
//const mongoURI='mongodb+srv://gofood:Piyush2000@cluster0.vu6gyjc.mongodb.net/gofoodmern?retryWrites=true&w=majority'


const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true });
      console.log("Connected");
      const foodCollection = mongoose.connection.db.collection("food_items");
      const data = await foodCollection.find({}).toArray();
      const foodCategory = await mongoose.connection.db.collection("foodCategory");
      const cateData= await foodCategory.find({}).toArray();

      global.food_items = data;
      global.foodCategory = cateData;

    } 
    catch (err) {
      console.log("---", err);
    }
  };


module.exports =mongoDB;
