const express = require('express');
const router = express.Router();


const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  console.log("/posts");
  //res.json("{}");
  try {
    const result = await Post
      .find()
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else 
      res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  console.log("/posts/:id");
  try {
    const result = await Post.findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});


router.post('/posts', async (req, res) => {
  console.log("adding ");
  try {
    const {author, title, text, created, updated, status, location, price, phone} = req.fields;

    let fileName;

    if (!req.files.photo) fileName = null;
    else fileName = req.files.photo.path.split('/').slice(-1)[0];
    console.log("fileName", req.files.photo.path);
    console.log("body", req.body);
    const newPost = new Post({ author: author, title: title, text: text, created: created, updated: updated, status: status, photo: fileName, location: location, price: price, phone: phone });
    console.log("newPost", newPost);
    await newPost.save();
    res.json(newPost);

  } catch (err) {
    res.status(500).json(err);
  }
});





router.put('/posts/:id', async (req, res) => {
  const { author, title, text, price, phone, location, updated, status, photo } = req.fields;

  console.log('req', req);

  try {
    const dep = await Post.findById(req.params.id);
    console.log ("dep", dep);
    if(dep) {
      await Post.updateOne({ _id: req.params.id }, { $set: { 
        author: author, 
        title: title, 
        text: text, 
        updated: updated, 
        status: status, 
        photo: photo, 
        location: location, 
        price: price, 
        phone: phone  }});
      console.log("dupa.01");
      res.json(await Post.findById(req.params.id));
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }
});

  /*try {

    let fileName;

    if (!req.files.photo) fileName = null;
    else fileName = req.files.photo.path.split('/').slice(-1)[0];

    const post = await Post.findOne({ _id: req.params.id });

    if (!post) res.status(404).json({ message: 'Post not found...' });
    else {
      post.author = author;
      post.title = title;
      post.text = text;
      post.price = price;
      post.phone = phone;
      post.location = location;
      post.photo = fileName;
      post.updated = updated;
      await post.save();
      res.json(post);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});*/


module.exports = router;
