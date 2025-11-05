import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render('index',{posts});
});

app.post('/add', (req,res) => {
    const {title , content} = req.body;
    posts.push({id:Date.now(), title, content});
    res.redirect('/');
});

app.get('/edit/:id', (req,res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit',{post});
});

app.post('/edit/:id' , (req,res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
    }
    res.redirect('/');
});

app.post('/delete/:id' , (req,res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});