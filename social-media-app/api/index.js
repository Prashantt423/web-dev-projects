import  express from 'express' ;
const  app= express();
import cors from 'cors'
app.use(cors())
import  mongoose from 'mongoose' 
import  dotenv from 'dotenv' ;
import  morgan from 'morgan' 
import  helmet from  'helmet' 
import  userRoute from  './routes/users.js' ;
import authRoute from './routes/auth.js' ;
import  postRoute from './routes/post.js' ;
dotenv.config()

mongoose.connect(process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
		console.log('connected to mongo')
	});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);



app.listen(8800,()=>{
    console.log("Backend server is running...")
})