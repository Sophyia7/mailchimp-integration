// Install required dependencies for project
const express = require('express');
const bodyParser = require('body-parser');
// This helps identify file path
const path = require('path');
// This is used to interact with requests
const axios = require('axios');

const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true}));

// Declare a static folder. This is similar to render_templates in flask
app.use(express.static(path.join(__dirname, 'public')));

// Subscribe Route
app.post('/signup', (req, res) =>{
    // Get data from form using destructing
    const { firstName, lastName, email} = req.body;

    // Validates form fields
    if(!firstName || !lastName || !email ){
        res.redirect('/fail.html');
        return;
    }

// Construct request data
    const data = {
        name: "Jane Doe",
        permission_reminder: "permission_reminder",
        email_type_option: true,
        campaign_defaults: {
            from_name: "from_name",
            from_email: "Beulah_Ryan@hotmail.com",
            subject: "subject",
            language: "English",
      },}

    // console.log(data)

// Covert constructed data to a string 
const postData = JSON.stringify(data);

    // Var will hold the url, api_key & authorization header 
    // mailchimp API 
    axios('https://us14.api.mailchimp.com/3.0/lists/aed472a5e8', {
        // Define a url method 
        method: 'POST',
        // Header values
        headers: {
          Authorization: 'auth fd8dcf6c6a4480b8af9306053ef35066-us14'
        },
        body: postData
    })
        .then(res.statusCode === 200 ?
            res.redirect('/success.html') :
            res.redirect('/fail.html'))
          .catch(err => console.log(err.message))
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server runnning at ${PORT}`));