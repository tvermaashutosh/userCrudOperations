const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/usercrudoperations"

// "mongodb+srv://tvermaashutosh:tvermaashutosh_myPassword@cluster0.6orspgu.mongodb.net/internalDatabase?retryWrites=true&w=majority"
const connectToMongo = async () => {
  mongoose.connect(mongoURI, async () => {
    console.log(">>>>    Connected to Mongo successfully!");
  })
}
// mongoose.connect(mongoURI).then(() => {
//   console.log(">>>>    Connected to Mongo successfully!")
// }).catch((err) => console.log(err))

module.exports = connectToMongo;
