
const express = require('express');
require('dotenv').config()

const cors = require('cors');
const dotenv = require('dotenv')
const app = express()

app.use(cors())

app.use(express.json())

const port = process.env.PORT || 5000;



app.get('/',async(req,res)=>{

     res.send('Server is running fine')

})
app.get('/coffees',async(req,res)=>{

    

})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_KEY}@cluster0.t9lecvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
console.log(`port is running on ${port}`)

})
