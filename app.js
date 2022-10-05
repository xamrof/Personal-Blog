const express = require('express');
const app = express();
const _ = require('lodash');
const mongoose = require('mongoose')
require('dotenv').config();


const {
    model,
    Schema
} = mongoose;


mongoose.connect(`mongodb+srv://admin-formax:qJiFsQBRehGNz6EA@personal-blog.wltbtiy.mongodb.net/postDB`, {
    useNewUrlParser: true
}).then(() => {
    console.log("server connected")
}).catch(e => console.error(e));


const homeStartingContent = "Welcome to my personal blog";
const aboutContent = "This is a blog created with Node JS, Express, MongoDB and mongoose technologies.";
const contactContent = "Linkedin";

const blogSchema = new Schema({
    title: String,
    content: String
})

const Post = new model('Post', blogSchema);

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));


app.get('/', (req, res) => {

    Post.find({}).then(result => {
        res.render('home', {
            homeStartingContent: homeStartingContent,
            posts: result
        })
    }).catch(e => console.error(e));


})

app.get('/about', (req, res) => {
    res.render('about', {
        aboutContent: aboutContent
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        contactContent: contactContent
    })
})

app.get('/compose', (get, res) => {
    res.render('compose')
})

app.post('/compose', (req, res) => {

    const adding = new Promise((resolve, reject) => {
        const item = new Post({
            title: req.body.postTitle,
            content: req.body.postArea
        })

        resolve(item.save())
    }).then(() => {
        res.redirect('/')
    }).catch(e => console.error(e));


})

//funcion para eliminar

app.post('/post', (req, res) => {

    const deletePost = req.body.delete;

    Post.findOneAndDelete({
            title: deletePost
        })
        .then(() => console.log("item deleted"))
        .catch(e => console.error(e));

    res.redirect('/')
})


//function para editar 

app.get('/edit/:editPost', (req, res) => {
    let editPost = _.lowerCase(req.params.editPost);
    Post.find({}).then(result => {
        result.forEach(post => {
            let postID = _.lowerCase(post._id)
            if (postID === editPost) {
                res.render('edit', {
                    title: post.title,
                    content: post.content,
                    idpost: post._id
                });
            }
        })
    })

})

app.post('/edit', (req, res) => {
    const editTitle = req.body.titleEdit;
    const editPost = req.body.editArea;
    const editId = req.body.idEdit;

    Post.findByIdAndUpdate(editId, {
            $set: {
                title: editTitle,
                content: editPost
            }
        })
        .then(() => res.redirect('/'))
        .catch(e => console.error(e))

})



app.get('/posts/:postName', (req, res) => {
    let postName = _.lowerCase(req.params.postName);

    Post.find({}).then(result => {
        result.forEach(post => {
            let postID = _.lowerCase(post._id)
            if (postName === postID) {
                res.render('post', {
                    title: post.title,
                    content: post.content,
                    idpost: post._id
                });
            }
        })
    })


});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log("funciono")
})