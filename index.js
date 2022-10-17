const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Connected RPL3'));

const uri = `mongodb+srv://${process.env.DB_USER
  }:${process.env.DB_PASS
  }@learningmongo.qf50z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function run() {
  try {
    await client.connect();
    const TeamsCol = client.db('RPL').collection('Teams');
    const teamNamesCol = client.db('RPL').collection('teamNames');
    
    //get all team names
    app.get('/teams', async (req, res) => {
      const cursor = TeamsCol.find({});
      const teamNames = await cursor.toArray();
      res.send(teamNames);
    });


  } finally { }
}

run().catch(console.dir);

app.listen(port, () => console.log('Listening to RPL port ', port));