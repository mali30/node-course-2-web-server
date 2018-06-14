const express = require('express');
// loading in handlebars
const hbs = require('hbs');

const fs = require('fs');

// make new express app
var app = express();

// takes direcotry for all partials. This means that we make files for codes and
// we use resue the code in the markup
hbs.registerPartials(__dirname + '/views/partials');

// takes two arguments, helper and function to run
hbs.registerHelper('getCurrentYear' , () =>{
    return new Date().getFullYear();
});

// will make things capital
hbs.registerHelper('screamIt' , (text) =>{
    return text.toUpperCase();
});

// this is how you use middleware
// next tells when middleware is done serving
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n' , (err) =>{
        if(err){
            console.log("Unable to append to server.log")
        }
    })

    // must have next or will not work
    next();

})


// THIS IS THE MAINTANENCE PAGE
app.use((req,res,next) =>{
        res.render('maintenance.hbs');
    //next();
})



// view engine is hbs
// setting express configurations
app.set('view engine' , 'hbs')

// adding middleware
// dirname stores the path
app.use(express.static(__dirname + '/public'))


// lets us set up handler for http request
app.get('/' , (req,res) =>{
    // response for request made
    //res.send('<h1>Hello Express</h1>');

    res.render('home.hbs' ,{
        // sending some json to our serveer
        name:'Mohamed Ali',
        welcome: "WELCOME",
        likes: [
            'soccer '  ,
             ' eating',
              ' sleeping']
    });
})
// specify the route
app.get('/about' , (req,res) =>{

    // renders static page
    // injecting data
    res.render('about.hbs' , {
        pageTitle: "About Page"
    });
});


app.get('/bad' , (req,res) =>{
   res.send({ 
       errorMessage: 'Unable to fufill request'
   });
})




// binds a port to listen to
// takes two arguments
app.listen(3000 , () =>{
  console.log("Server is up on port 3000")  
});