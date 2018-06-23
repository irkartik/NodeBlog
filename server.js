var express = require('express');

// bodyParser is used for parsing the request's body that 
// we have recieved. (parse json input as request)
var bodyParser = require('body-parser');

//DATABASE STUFF-----------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogdb');

//CREATING THE SCHEMA
var PostSchema = mongoose.Schema({
	title: {type: String, required: true},
	body: String,
	tag: {type: String, enum: ['POLITICS', 'ENONOMY', 'EDUCATION']},
	posted: {type: Date, default: Date.now}
}, {collection: 'post'});

// CREATE OBJECT FOR INTERACTING WITH DATABASE
var PostModel = mongoose.model("PostModel", PostSchema);

//---------------------------------------------

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CREATING AN ENDPOINT--------------------
app.post("/api/blogpost/", createPost);
app.get("/api/blogpost/", getAllPosts);
app.delete("/api/blogpost/:id", deletePost);
app.get("/api/blogpost/:id", getPostById);
app.put("/api/blogpost/:id", updatePost);

function updatePost(req, res){
	var postId = req.params.id;
	var post = req.body;

	PostModel
		.update({_id: postId}, {
			title: post.title,
			body: post.body
		})
		.then(
			function (status){
				res.sendStatus(200);
			},
			function (err){
				res.sendStatus(400);
			}
		)
}

function getPostById(req, res){
	var postId = req.params.id;
	console.log(postId)
	PostModel
		.findById(postId)
		.then(
			function (post){
				res.json(post);
			},
			function(error){
				res.sendStatus();
			}
		);
}

function deletePost(req, res){
	var postId = req.params.id;
	PostModel
		.remove({_id: postId})
		.then(
			function(status){
				res.sendStatus(200);
			},
			function(){
				res.sendStatus(400);
			}
		);
}

function getAllPosts(req, res){
	PostModel
		.find()
		.then(
			function(posts){
				res.json(posts);
			},
			function(error){
				res.sendStatus(400);
			}
		)
}

function createPost(req,res) {
	var post = req.body;
	PostModel
		.create(post)
		.then(
			function(postObj){
				res.json(200);
			},
			function(error){
				res.sendStatus(400);
			}
		);
}
// creating endpint END---------------------

app.listen(3000);