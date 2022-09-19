const { Post } = require('../database/models');
const { Op } = require("sequelize");

// cari semua post
const getAllPosts = async ({ search, writer, sort, direction, page, size }) => {
  const searching = search || "";
  const user = writer || 0;
  const pages = Number.parseInt(page) || 0;
  const sizes = Number.parseInt(size) || 3;

  const sorting = ["id", "title", "description"];
  const directions = ["asc", "desc"];
  let sorted;
  let ordered;
  for (let i = 0; i < sorting.length; i++) {
    if (sort == sorting[i]) sorted = sorting[i];
    else sorted = "title";
  }
  for (let i = 0; i < directions.length; i++) {
    if (direction == directions[i]) ordered = directions[i];
    else ordered = "asc";
  }

  console.log(sorted);
  console.log(ordered);

  let data = {};
  if (user != 0) {
    data = await Post.findAndCountAll({
      where: {
        userId: {
          [Op.in]: [user],
        },
      },
      order: [[sorted, ordered]],
      limit: sizes,
      offset: sizes * pages,
    });
  } else {
    data = await Post.findAndCountAll({
      where: {
        title: {
          [Op.substring]: searching,
        },
      },
      order: [[sorted, ordered]],
      limit: sizes,
      offset: sizes * pages,
    });
  }
  let posts = {
    data: data.rows,
    totalPages: Math.ceil(data.count / sizes),
  };

  return posts;
};

// cari satu post (detail post)
const getAllPostsByPostId = async ({ postId }) => {
  return await Post.findByPk(postId);
};

// cari semua post berdasarkan userId
const getAllPostsByUserId = async ({ writer }) => {
  return await Post.findAll({
    where: { userId: writer },
  });
};

// buat post baru
const createNewPost = async ({ title, image, description, userId }) => {
  return await Post.create({
    title,
    image,
    description,
    userId,
  });
};

// edit post
const updatePost = async ({ postId, title, image, description, authUser }) => {
  return await Post.update(
    {
      title,
      image,
      description,
    },
    {
      where: {
        [Op.and]: {
          id: postId,
          userId: authUser,
        },
      },
      returning: true,
    }
  );
};

const postRepository = {
  getAllPosts,
  getAllPostsByUserId,
  getAllPostsByPostId,
  createNewPost,
  updatePost,
};

module.exports = postRepository;