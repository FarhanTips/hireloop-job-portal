
import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Working')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
