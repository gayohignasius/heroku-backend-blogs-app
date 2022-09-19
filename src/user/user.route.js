const express = require("express");
const tokenVerification = require("../middleware/token.verification");
const validate = require("../middleware/validation/validate");
const { checkSchema } = require("express-validator");

const userController = require("./user.controller");
const userRouter = express.Router();
const schemas = require("../middleware/validation/schemas");

/**
 * @swagger
 * /api/registration:
 *  post:
 *    tags:
 *      - User
 *    summary: API untuk registrasi user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullName:
 *                type: string
 *                example: Ignasius Gayoh
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
 *                id:
 *                  type: integer
 *                fullName:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
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
userRouter.post(
  "/api/registration",
  validate(checkSchema(schemas.registrationSchema)),
  userController.createNewUser
);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *  put:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - User
 *    summary: API untuk edit user
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullName:
 *                type: string
 *                example: Ignasius Gayoh Adi Jaya
 *              email:
 *                type: string
 *                example: example@gmail.com
 *              password:
 *                type: string
 *                example: new_Password@123!
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                fullName:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
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
userRouter.put(
  "/api/v1/users/:userId",
  tokenVerification,
  validate(checkSchema(schemas.updateUser)),
  userController.editUser
);

module.exports = userRouter;