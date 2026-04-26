import express,{ Request, Response } from "express";
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
import routerMovies from "./routes/movie-route";
app.use(routerMovies);
app.get('/test', (req:Request, res:Response) => {
    res.send('the server is working');
});
app.listen(port, () => {
    console.log(`The server is lisiting on port ${port}`);
});
