const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv/config')

const app = express()
const PORT = process.env.PORT

//setting cors
var corsOptions = {
    origin: "http://localhost:8081"
}


//use app
app.use(morgan('tiny'))
// app.use(bodyParser.json())
app.use(express.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())

const db = require("./src/models");
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        userNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Succesfully connect to MongoDB")
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    })

app.get('/', (req,res)=>{
    res.json({message:"Welcome to laundry-app-API"})
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})

const initial = () => {
    Role.estimatedDocumentCount((err,count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error",err);
                }

                console.log("added 'user' to roles collection")
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection")
            })

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err)
                }

                console.log("added 'admin' to roles collection")
            })
        }
    });
}