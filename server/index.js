import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import BookRoutes from './Routes/BookRoute.js'
import StudentRoutes from './Routes/StudentRouter.js'
import PublisherRoutes from './Routes/PublisherRoute.js'
import LoanRoutes from './Routes/LoanRoute.js'
import StaffRouter from './Routes/StaffRoute.js'
import mysql from "mysql";
import cors from 'cors'

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))


app.use('/book',BookRoutes);
app.use('/student',StudentRoutes);
app.use('/pub',PublisherRoutes);
app.use('/loan',LoanRoutes);
app.use('/staff',StaffRouter);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbms"
});

connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port: ${process.env.PORT}`)
})