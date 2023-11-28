require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;
const session = require('./app/services/middleware/sessionMiddleware');
const error = require('./app/errorHandler/errorCases')

app.use(cors({origin : process.env.CORS_URL}));

//routers bloc
const routeBase = './app/routers'
const basicRouter = require(`${routeBase}/basicRouter`)
const controlRouter = require(`${routeBase}/controlRouter`) 
const userRouter = require(`${routeBase}/userRouter`)
const warningRouter = require(`${routeBase}/warningRouter`)
//session middleware
app.use(session.sessionOpen)
app.use(session.addUsertoSession)

app.use(express.json())
// linking routers with index endPoint
app.use(basicRouter,controlRouter ,userRouter ,warningRouter )

// Handling error cases

app.use(error.manage)
app.use(error._404)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});