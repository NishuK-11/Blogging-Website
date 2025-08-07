// // console.log("Server is running on port 3000");
// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import dbCon from './db/db.js'
// // import AuthRoutes from './routes/Auth.js'

// dotenv.config()

// const PORT = process.env.PORT || 5000;
// const app = express();
// dbCon();
// console.log("working till now");
// app.use(express.json());
// app.use(cors());
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// // app.use('/api/auth',AuthRoutes);


// app.listen(PORT, () => {
//   console.log( `server running on port ${PORT}` );
// });
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import dbCon from './db/db.js';
import AuthRoutes from './routes/Auth.js';
import AdminRoutes from './routes/AdminRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

// ✅ Initialize app BEFORE using it
const app = express();

// ✅ Middleware (after app initialized)
app.use(cors());
app.use(express.json());
app.use(cookieparser());
// ✅ Connect to DB
dbCon();

// ✅ Routes
app.get('/', (req, res) => {
  res.send("hii i am nishu");
});
app.use('/api/auth', AuthRoutes);
app.use('/api/admin',AdminRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
