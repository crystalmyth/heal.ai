import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import index_router from './routes/index.route.js';
import sequelize from './config/db.js';

dotenv.config();

sequelize.sync({ force: false });

// import { up as adminUp } from './seeders/admin.seeder.js';
// adminUp();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(index_router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;