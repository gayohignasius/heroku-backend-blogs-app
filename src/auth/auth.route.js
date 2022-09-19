const express = require("express");
const validate = require("../middleware/validation/validate");
const authController = require("./auth.controller");
const { checkSchema } = require("express-validator");

const schemas = require("../middleware/validation/schemas");
const corsOption = require("../middleware/corsOption");
const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    tags:
 *      - Authorization
 *    summary: API login
 *    description: API ini digunakan untuk login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: example@gmail.com
 *              password:
 *                type: string
 *                example: Password@123!
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJnYXlvaCIsImVtYWlsIjoiZ2F5b2hAZ21haWwuY29tIiwiaWF0IjoxNjYwMjI0Nzg5LCJleHAiOjE2NjAzMTExODl9.N3A-j4tsY1PPNbVZrowmHDJwwdQJWeIT-uTEJn60sg8
 *      '400':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Login failed!
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

authRouter.post(
  "/api/auth/login",
  validate(checkSchema(schemas.loginSchema)),
  authController
);

module.exports = authRouter;