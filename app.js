const express = require('express')
const ejs = require('ejs')
const _ = require('lodash');

const posts = [];

const homeStartingContent = "Welcome to my new personal blog";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', (req, res) =>{
    res.render('home', {homeStartingContent: homeStartingContent, posts: posts})
})

app.get('/about', (req, res) =>{
    res.render('about', {aboutContent: aboutContent})
})

app.get('/contact', (req, res) =>{
    res.render('contact', {contactContent: contactContent})
})

app.get('/compose', (get, res) =>{
    res.render('compose')
})

app.post('/compose', (req, res) =>{
    const posting = {
      title: req.body.postTitle,
      content: req.body.postArea
    }

    posts.push(posting);
    res.redirect('/')
})


app.get('/posts/:postName', (req, res) =>{
    let test =  _.lowerCase(req.params.postName);
    posts.forEach(post => {
        let testTitle = _.lowerCase(post.title)
        if(testTitle === test){
            res.render('post', {
                title: post.title,
                content: post.content,
            });
        }
    });
});



app.listen(process.env.PORT || 3000, () =>{
    console.log("funciono")
})