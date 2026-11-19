
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
const payments = db.collection("payments");
const sessions = db.collection("session");



const verifyToken = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ msg: "Falsy token" });
    }
    const token = authHeader.split(" ")[1];
    // console.log(token)
    if (!token) {
        return res.status(401).send({ msg: "Falsy token" });
    }

    const session = await sessions.findOne({ token: token });
    if (!session) {
        return res.status(401).send({ msg: "Unauthorized" });
    }
    const userId = session.userId;
    // console.log("user", userId)

    const user = await users.findOne({ _id: new ObjectId(userId) });
    // console.log(user)
    if (!user) {
        return res.status(401).send({ msg: "Unauthorized" });
    }

    req.user = user;
    // console.log(req.user)
    next();
}

const verifySeeker = async (req, res, next) => {
    if (req.user.role !== "seeker"){
        return res.status(403).send({ msg: "Forbidden" });
    }
    next();
}
const verifyRecruiter = async (req, res, next) => {
    if (req.user.role !== "recruiter"){
        return res.status(403).send({ msg: "Forbidden" });
    }
    next();
}
const verifyAdmin = async (req, res, next) => {
    if (req.user.role !== "admin"){
        return res.status(403).send({ msg: "Forbidden" });
    }
    next();
}


app.get('/', (req, res) => {
    res.send('Working')
})

app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    const result = await users.find().toArray();
    res.send(result);
})

app.patch("/user/role-update/:id", verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id
    const result = await users.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                role: req.body.role
            }
        }
    );
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
        if (req.query.recruiterId) {
            query.recruiterId = req.query.recruiterId;
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

app.post('/add-job', verifyToken, verifyRecruiter, async (req, res) => {
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

app.post("/applyJob", verifyToken, verifySeeker, async (req, res) => {
    const data = req.body;
    const result = await applications.insertOne(data);

    res.send(result);
})

app.get('/myApplications', verifyToken, async (req, res) => {
    const query = {};
    console.log(req.query)
    if (req.query.applicantId) {
        query.applicantId = req.query.applicantId;
    }
    if (req.query.jobId) {
        const job = await jobs.findOne({_id: new ObjectId(req.query.jobId)});
        if (job.recruiterId !== req.user._id.toString()){
            return res.status(403).send({ msg: "Forbidden" });
        }
        query.jobId = req.query.jobId;
    }

    const result = await applications.find(query).toArray();
    res.send(result);
})

app.get('/myApplications/count', async (req, res) => {
    const query = {};
    console.log(req.query)
    if (req.query.applicantId) {
        query.applicantId = req.query.applicantId;
    }

    const result = await applications.countDocuments(query);
    res.send({ count: result });
})

app.patch('/applications/:id', async (req, res) => {
    const id = req.params.id;
    console.log("req.body", req.body)
    const result = await applications.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                applicationStatus: req.body.applicationStatus
            }
        }
    );
    console.log(result);
    res.send(result);
})

app.post("/payment-verify", async (req, res) => {

    const { sessionId } = req.body;
    // console.log(req.body);
    // console.log(sessionId);
    if (!sessionId) {
        return res.send({ success: false, message: 'Session ID is required' });
    }

    const {
        status,
        payment_status,
        payment_intent,
        metadata,
        customer_email,
        amount_total,
    } = await stripe.checkout.sessions.retrieve(sessionId);


    if (status === 'complete' && payment_status === "paid") {

        const existingPayment = await payments.findOne({ sessionId: sessionId });
        if (existingPayment) {
            return res.send({ success: false, msg: "Payment already verified" });
        }

        const payment = {
            sessionId,
            status,
            payment_status,
            payment_intent,
            userId: metadata.userId,
            customer_email,
            paid_amount: amount_total / 100,
            payment_date: new Date(),
        }

        const result = await payments.insertOne(payment);

        const updateResult = await users.updateOne(
            { _id: new ObjectId(metadata.userId) },
            {
                $set: {
                    premium: true,
                }
            }
        )

        res.send({ success: true, result, updateResult });
        return;
    }

    res.send({ success: false, msg: "payment verification failed" });
})

app.get('/premium-user/:id', async (req, res) => {
    const id = req.params.id;
    const result = await users.findOne(
        { _id: new ObjectId(id) },
        { projection: { premium: 1 } }
    );
    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
