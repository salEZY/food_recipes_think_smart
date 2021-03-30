const mongoose = require("mongoose");
const DB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@foodrecipes.cvf6m.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const connectToDb = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(`MongoError: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectToDb;
