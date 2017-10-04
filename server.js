const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

// I create a middleware that keep track how the server is working , show on the console and save on file
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `log -> ${now}: ${req.method} ${req.url}`;
    console.log("log: ",log);

    fs.appendFile('server.log', log + '\n' , (err) => {
        if (err) throw err;
        next();
    });
});

//middleware maintenance
/**app.use((req, res, next) =>{
    res.render('maintenance.hbs',{
        title:'Maintenance',
        message:'The site is currently being updated.'
    });
});**/

//add Midelware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

//Here I create a route that handler for http request
app.get('/',(req, res)=>{
    //response.send("<h1>Hello Express</h1>");
    /**res.send({
        name:'Andrew',
        likes:['Biking','Cities']
    });**/
    res.render('home.hbs',{
        pageTitle:"Home Page",
        welcomeMessage:'Welcome to the Home page'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle:"Abotu Page"
    });
});

//Unable to fulfill this request
app.get('/bad', (req, res)=>{
    res.send({
        errorMessage:"Unable to handle request"
    });
});

app.get('/projects', (req, res)=>{
    res.render('projects', {
        pageTitle:'Projects Page',
        projectsMessage:'Portafolio page'
    });
})

//make the server listen and defien the port 
app.listen(port, ()=>{
    console.log(`The server is up on port ${port}`);
});