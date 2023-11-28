const session = require('express-session')


const sessionOpen = session({
    secret: 'cuisto',
    resave: true,
    saveUninitialized : true,
    cookie : {
        secure : false ,// http mode doesn't require it 
        maxAge : (60*60) // session duration : 1 hour
    }
})
function addUsertoSession (request , response , next){
    const user = request.session.user
    response.locals.user = user
    next()
}

module.exports = { sessionOpen , addUsertoSession }