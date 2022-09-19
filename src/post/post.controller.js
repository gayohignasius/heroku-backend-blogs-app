const postService = require("./post.service");

const getAllPosts = async (req, res) => {
  const { search } = req.query;
  const { writer } = req.query;
  const { sort } = req.query;
  const { direction } = req.query;
  const { page } = req.query;
  const { size } = req.query;

  try {
    const posts = await postService.getAllPosts({
      search,
      writer,
      sort,
      direction,
      page,
      size,
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPostsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const posts = await postService.getAllPostsByPostId({ postId });
    if (posts) res.status(200).json(posts);
    else res.status(200).json({ message: "No post found!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewPost = async (req, res) => {
  const authUser = req.auth.id;
  const { title, image, description } = req.body;

  try {
    const newPost = await postService.createNewPost({
      title,
      image,
      description,
      userId: authUser,
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, image, description } = req.body;
  const authUser = req.auth.id;

  try {
    const post = await postService.getAllPostsByPostId({ postId });
    console.log("posts: " + post);
    if (post.userId == authUser) {
      const updatedPost = await postService.updatePost({
        postId,
        title,
        image,
        description,
        authUser,
      });
      res.status(200).json(updatedPost);
    } else res.status(400).json("Unauthorized!");
  } catch (error) {
    res.status(500).json("Internal Server Error!");
  }
};

const postController = {
  getAllPosts,
  getAllPostsByPostId,
  createNewPost,
  updatePost,
};

module.exports = postController;