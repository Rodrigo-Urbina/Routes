const uuid = require('uuid');

let post1 = {
	id: uuid.v4(),
	title: 'Lab1',
	content: 'balblabal',
	author: 'Rodrigo',
	publishDate: new Date(2019, 3, 31)
};

let post2 = {
	id: uuid.v4(),
	title: 'Lab2',
	content: 'balblabal',
	author: 'Rodrigo',
	publishDate: new Date(2019, 3, 31)
};

let posts = [post1, post2];

const ListPosts = {
	get : function(){
		return posts;
	}
}

module.exports = {ListPosts};