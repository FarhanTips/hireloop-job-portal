
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());




const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}

const connectedClient = await connectToMongoDB();

app.get('/', (req, res) => {
    res.send('Working')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
