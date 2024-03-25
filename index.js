const express = require("express");
require("dotenv").config();

const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send("Server is running fine");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_KEY}@cluster0.t9lecvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("insertDB");
    const coffeeCollection = database.collection("coffees");

    app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await coffeeCollection.findOne(query);

      res.send(result);
    });
    app.get("/coffees", async (req, res) => {
      const cursor = coffeeCollection.find();
      const coffeesArray = await cursor.toArray();

      res.send(coffeesArray);
    });

    app.post("/coffees", async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await coffeeCollection.insertOne(user);
      res.send(result);
    });

    app.put("/coffee/:id", async (req, res) => {
      const id = req.params.id;

      const user = req.body;

      const filter = { _id: new ObjectId(id) };

      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: user.name,
          chef: user.chef,
          taste: user.taste,
        },
      };

      const result = await coffeeCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send(result);
    });

    app.delete("/coffee/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await coffeeCollection.deleteOne(query);

      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
