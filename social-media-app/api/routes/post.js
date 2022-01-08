import Routers from "express";
import Post from "../models/posts.js";
import User from "../models/users.js";

const router = Routers.Router();

// Create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    const user = await User.findById(req.body.userId);
    newPost.userName = user.username;
    if (!user.posts.includes(savedPost._id)) {
      const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
        $push: { posts: savedPost._id },
      });
    }
    res.status(200).json(savedPost);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Update a post
router.put("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId === req.body.userId) {
      const updatedPost = await Post.findOneAndUpdate(req.params.postId, {
        $set: req.body,
      });

      updatedPost && res.status(200).json("Post updated successfully!");
      res.status(500).json("Unknown error occured");
    } else {
      res.status(403).json("Not allowed");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});
// Delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post && post.userId === req.body.userId) {
      await Post.findOneAndDelete(req.params.postId);
      res.status(200).json("Post deleted successfully!");
    } else {
      res.status(403).json("Post doesn't exist");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Like a post
router.put("/:postId/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.body.userId)) {
      const updatedLikes = await Post.findByIdAndUpdate(req.params.postId, {
        $push: { likes: req.body.userId },
      });
      updatedLikes && res.status(200).json("Liked successfully");
    } else {
      const updatedDisLikes = await Post.findByIdAndUpdate(req.params.postId, {
        $pull: { likes: req.body.userId },
      });
      updatedDisLikes && res.status(200).json("Disliked successfully");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});
// Get a post
router.get("/view/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
});
// Get timeline posts of any user
router.get("/timeline/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const postIds = user.posts;
    const posts = await Promise.all(
      postIds.map(async function (id) {
        return await Post.findById(id);
      })
    );

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});
// Get timeline posts of any user by USERNAME
router.get("/timeline/user/:username", async (req, res) => {
  try {
    const result = await Post.find({ username: req.params.username });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});

// News Feed of the user
router.get("/feed/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const followers = user.followers;
    const following = user.following;
    let result = [];
    const people = [...new Set([...followers, ...following])];
    await Promise.all(
      people.map(async (peopleId) => {
        const data = await Post.find({ userId: peopleId });
        result.push(...data);
      })
    );
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
});
export default router;
