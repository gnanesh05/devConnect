const express =  require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

//init middleware
app.use(express.json({extended: false}));


app.get("/",(req,res)=>{
    res.send("backend api");
})

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`running in port ${port}`));


