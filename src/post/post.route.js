const express = require('express');
const tokenVerification = require("../middleware/token.verification");
const validate = require("../middleware/validation/validate");
const { checkSchema } = require("express-validator");

const schemas = require("../middleware/validation/schemas");
const postController = require("./post.controller");
const corsOption = require("../middleware/corsOption");
const postRouter = express.Router();

/**
 * @swagger
 * /api/v1/posts:
 *  get:
 *    tags:
 *      - Post
 *    summary: API get semua post
 *    parameters:
 *      - in: query
 *        name: search
 *        required: false
 *        schema:
 *          type: string
 *        description: to get specific posts with title
 *      - in: query
 *        name: writer
 *        required: false
 *        schema:
 *          type: integer
 *        description: to get specific post with user id
 *      - in: query
 *        name: sort
 *        required: false
 *        schema:
 *          type: string
 *        description: sorting query of field column
 *      - in: query
 *        name: direction
 *        required: false
 *        schema:
 *          type: string
 *        description: sorting direction can be 'asc' or 'desc'
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: integer
 *        description: number for the page of pagination
 *      - in: query
 *        name: size
 *        required: false
 *        schema:
 *          tpe: integer
 *        description: number for query shown of the each page of pagination
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                description:
 *                  type: string
 *                userId:
 *                  type: integer
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                deletedAt:
 *                  type: string
 *      '400':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Bad Request
 *      '500':
 *        content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Internal Server Error
 */
postRouter.get("/api/v1/posts", postController.getAllPosts);

/**
 * @swagger
 * /api/v1/posts/{postId}:
 *  get:
 *    tags:
 *      - Post
 *    summary: API get detail post / get post by id
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                description:
 *                  type: string
 *                userId:
 *                  type: integer
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                deletedAt:
 *                  type: string
 *      '400':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Bad Request
 *      '500':
 *        content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Internal Server Error
 */
postRouter.get("/api/v1/posts/:postId", postController.getAllPostsByPostId);

/**
 * @swagger
 * /api/v1/posts:
 *  post:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - Post
 *    summary: API untuk buat post baru
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: nesciunt iure omnis dolorem tempora et accusantium
 *              image:
 *                type: string
 *                example: sample image
 *              description:
 *                type: string
 *                example: consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                description:
 *                  type: string
 *                userId:
 *                  type: integer
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                deletedAt:
 *                  type: string
 *      '400':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Bad Request
 *      '500':
 *        content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Internal Server Error
 */
postRouter.post(
  "/api/v1/posts",
  tokenVerification,
  validate(checkSchema(schemas.createNewPost)),
  postController.createNewPost
);

/**
 * @swagger
 * /api/v1/posts/{postId}:
 *  put:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - Post
 *    summary: API untuk edit post
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: dolorem dolore est ipsam
 *              image:
 *                type: string
 *                example: sample image
 *              description:
 *                type: string
 *                example: dignissimos aperiam dolorem qui eum facilis quibusdam animi sint suscipit qui sint possimus cum quaerat magni maiores excepturi ipsam ut commodi dolor voluptatum modi aut vitae
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                description:
 *                  type: string
 *                userId:
 *                  type: integer
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                deletedAt:
 *                  type: string
 *      '400':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Bad Request
 *      '500':
 *        content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Internal Server Error
 */
postRouter.put(
  "/api/v1/posts/:postId",
  tokenVerification,
  validate(checkSchema(schemas.updatePost)),
  postController.updatePost
);

module.exports = postRouter;
