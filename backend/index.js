const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

const DB = "mongodb+srv://tvermaashutosh:tvermaashutosh_myPassword@cluster0.6orspgu.mongodb.net/internalDatabase?retryWrites=true&w=majority"

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend app listening on port ${port}`);
})
