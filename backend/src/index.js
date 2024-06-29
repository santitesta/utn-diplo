import express, { json } from 'express';
const app = express();
const port = process.env.PORT || 3001;

app.use(json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
