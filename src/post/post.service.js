const postRepo = require('./post.repository');

const getAllPosts = async ({ search, writer, sort, direction, page, size }) => {
  return await postRepo.getAllPosts({
    search,
    writer,
    sort,
    direction,
    page,
    size,
  });
};

const getAllPostsByPostId = async ({ postId }) => {
  return await postRepo.getAllPostsByPostId({ postId });
};

const createNewPost = async ({ title, image, description, userId }) => {
  return postRepo.createNewPost({ title, image, description, userId });
};

const updatePost = async ({ postId, title, image, description, authUser }) => {
  return await postRepo.updatePost({
    postId,
    title,
    image,
    description,
    authUser,
  });
};

const postService = {
  getAllPosts,
  getAllPostsByPostId,
  createNewPost,
  updatePost,
};

module.exports = postService; 