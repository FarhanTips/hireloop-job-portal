
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb';

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

const db = connectedClient.db("hireloopDB");
const users = db.collection("user");
const jobs = db.collection("jobs");
const applications = db.collection("applications");


app.get('/', (req, res) => {
    res.send('Working')
})

app.get('/users', async (req, res) => {
    const result = await users.find().toArray();
    res.send(result);
})

app.get('/jobs', async (req, res) => {
    console.log(req.query);
    const query = {};
    if (req.query) {
        if (req.query.position) {
            query.position = req.query.position;
        }
        if (req.query.jobCategory) {
            query.jobCategory = req.query.jobCategory;
        }
        if (req.query.remote) {
            query.remote = req.query.remote === "true";
        }
        if (req.query.search) {
            query.$or = [
                { jobTitle: { $regex: req.query.search, $options: "i" } },
                { location: { $regex: req.query.search, $options: "i" } },
                { companyName: { $regex: req.query.search, $options: "i" } },
            ];
        }

    }
    const result = await jobs.find(query).toArray();
    res.send(result);
})

app.post('/add-job', async (req, res) => {
    const data = req.body;
    const result = await jobs.insertOne(data);

    res.send(result);
})

app.delete('/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const result = await jobs.deleteOne({ _id: new ObjectId(id) });

    res.send(result);
})

app.get('/jobs/:id', async (req, res) => {
    const id = req.params.id;
    const result = await jobs.findOne({ _id: new ObjectId(id) });

    res.send(result);
})

app.post("/applyJob", async (req, res) => {
    const data = req.body;
    const result = await applications.insertOne(data);

    res.send(result);
})

app.get('/myApplications', async (req, res) => {
    const query = {};
    console.log(req.query)
    if (req.query.applicantId) {
        query.applicantId = req.query.applicantId;
    }

    const result = await applications.find(query).toArray();
    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
