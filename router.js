const express = require ('express');
const bodyParser = requiere('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const uuid = require('uuid');
const router = express.Router();
const {ListPosts} = require('./model');



app.get('/blog-posts', (req, res) => {
	let posts = ListPosts.get();

	res.status(200).json({
		message: "You have successfully received all the posts",
		status: 200,
		posts: posts
	});
});

router.get('/blog-posts/:author', (req, res) => {
	let posts = ListPosts.get();

	var author = req.params.author;
	let foundPosts = [];

	if(author)
	{
		posts.forEach(item => {
			if(author == item.author) {
				foundPosts.push(item);
			}
		});

		res.status(200).json({
			message: 'You have successfully received all the posts corresponding to that author',
			status: 200
		});

	} else {
		res.status(406).json({
			message: 'Your input is empty',
			status: 406
		});
	}
});

router.post('/blog-posts', jsonParser, (req, rest) => {
	let posts = ListPosts.get();

	let tempPost = ["title", "content", "author", "publishDate"];
	let cont = 0;

	for(cont; cont < 4; cont++) {
		if(!(tempPost[cont] in req.body)) {
			res.status(406).json( {
				message: 'Your input is empty',
				status: 406
			});
			return;
		}

		let newPost = {
			id: uuid.v4(),
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			date: new Date(req.body.publishDate)
		};

		posts.push(newPost);

		res.status(201).json({
			message: 'Your post has been successfully created',
			status: 201,
		})
	}
});

router.delete('/blog-posts/:id', jsonParser, (req, res) => {
	let posts = ListPosts.get();

	let requiredFields = ['id'];
	let cont = 0;

	for(cont, cont < requiredFields.length; cont++) {
		let currentField = requiredFields[cont];

		if(! (currentField in req.body)) {
			res.status(406).json({
				message:'Missing field ${currentField} in body',
				status: 406
			}).send("Finish");
		}
	}

	let postId = req.params.id;

	if(postId) {
		if(postId == req.body.id) {
			posts.forEach((item, index) => {
				if(item.id == postId) {
					posts.splice(index, 1);

					res.status(204).json({
						message: "successfully deleted the post",
						status: 204, 
					});
				}
			});

			res.status(404).json({
				message: "Post not found in the list",
				status: 404
			}).send("Finish");
		} else {
			res.status(400).json({
				message: "Param and body do not match",
				status: 400
			}).send("Finish");
		}
	} else {
		res.status(406).json({
			message: "Missing param 'id'",
			status: 406
		}).send("Finish");
	}
});


router.put('/blog-posts/:id', jsonParser, (req, res) => {
	let posts = ListPosts.get();

	let id = req.params.id;

	if(!id) {
		res.status(406).json({
			message: "Missing param 'id'",
			status: 406
		}).send("Finish");

		return;
	}

	posts.forEach((item, index) => {
		if(item.id == id) {
			for(let key in req.body) {
				if(key == 'title' || key == 'content' || key == 'author') {
					item[key] = req.body[key];
				}
				else if(key == 'date') {
					item[key] = new Date(req.body[key]);
				}
			}

			res.status(200).json({
				message: "The Post has been updated",
				status: 200
			});
		}
	});
});

module.exports = router;