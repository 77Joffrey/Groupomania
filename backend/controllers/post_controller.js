const Post = require("../models/Post");
const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");


exports.getPosts = (req, res, next) => {
  Post.find((err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log("Erreur pour récupérer les posts!" + err);
    }
  }).sort( { createdAt : -1 });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({_id : req.params.id})
      .then(post => {
          res.status(200).json({post})
      })
      .catch(error => {
          res.status(400).json({ error })
      });
};

exports.createPost = async (req, res, next) => {
  const newPost = new Post({
    posterId: req.body.posterId,
    message: req.body.message,
    /* picture : `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`, */
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.updatePost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id inconnu :" + req.params.id);
  const updatePostContent = { message: req.body.message };
  Post.findByIdAndUpdate(
    req.params.id,
    { $set: updatePostContent },
    { new: true },
    (err, data) => {
      if (!err) res.status(200).send(data);
      else console.log("Mise à jour du post impossible! " + err);
    }
  );
};

exports.deletePost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id inconnu :" + req.params.id);
  Post.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) res.status(200).send(data);
    else console.log("Suppression du post impossible! " + err);
  });
};

exports.likePost = (req, res, next) => {
  Post.findOne({_id : req.params.id})
    .then(post =>{
      switch (req.body.like) {
        case 1:
          if(!post.usersLiked.includes(req.body.posterId) && req.body.like === 1) {
            Post.updateOne({_id : req.params.id},
              { 
                $inc : { likes : 1},
                $push : { usersLiked : req.body.posterId}
              }
            )
            .then(() => {
              res.status(201).json({ message : 'Like ajouté!'})})
          .catch(error => {
              res.status(400).json({ error })
          })
        }
          break;
        case -1:
          if(!post.usersDisliked.includes(req.body.posterId) && req.body.like === -1) {
            Post.updateOne({_id : req.params.id},
              {
                $inc : { dislikes : 1},
                $push : { usersDisliked : req.body.posterId}
              }
            )
            .then(() => {
              res.status(201).json({ message : 'Dislike ajouté!'})})
          .catch(error => {
              res.status(400).json({ error })
          })
        }
          break;
        case 0 :
          if(post.usersLiked.includes(req.body.posterId) && req.body.like === 0 ) {
            Post.updateOne({_id : req.params.id},
              {
                $inc : { likes : -1 },
                $pull : { usersLiked : req.body.posterId }
              }
            )
            .then(() => {
              res.status(201).json({ message : 'Aucun vote!'})})
          .catch(error => {
              res.status(400).json({ error })
          })
        } else if(post.usersDisliked.includes(req.body.posterId) && req.body.like === 0 ) {
          Post.updateOne({_id : req.params.id},
            {
              $inc : { dislikes : -1},
              $pull : { usersDisliked : req.body.posterId }
            }
          )
          .then(() => {
            res.status(201).json({ message : 'Aucun vote!'})})
        .catch(error => {
            res.status(400).json({ error })
        })
        }
          break;
      }
    })
    .catch(error => {
      res.status(404).json({ error })
    })
  }