const express = require("express");
const {nuevoProduct, buscarProductos} = require("../controller/products/products.controller");
const {loginController, newUserController, updateUserController, removeUserController} = require("../controller/login/login.controller");
const {newClientController} = require("../controller/clients/clients.controller");
const {getSalesController, insertSalesController, updateSalesController, removeSalesController} = require("../controller/sales/sales.controller");
const router = express.Router();

// LOGIN
/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     identificacion:
 *      type: string
 *      description: the user id
 *     nombre:
 *      type: string
 *      description: the name user
 *     correo:
 *      type: string
 *      description: the user email
 *     celular:
 *      type: string
 *      description: the user number
 *     direccion:
 *      type: string
 *      description: the user direction
 *     contrasena:
 *      type: string
 *      description: the user password
 */

/**
 * @swagger
 * /api/login:
 *  post:
 *    summary: login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        decription: nuevo login
 */
router.post("/login", loginController);
/**
 * @swagger
 * /api/newUser:
 *  post:
 *    summary: login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        decription: nuevo login
 */
router.post("/newUser", newUserController);
/**
 * @swagger
 * /api/updateUser:
 *  post:
 *    summary: login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        decription: nuevo login
 */
router.post("/updateUser", updateUserController);
/**
 * @swagger
 * /api/removeUser:
 *  post:
 *    summary: login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        decription: nuevo login
 */
router.post("/removeUser", removeUserController);

// CLIENTS
router.post("/newClient", newClientController);

// SALES
/**
 * @swagger
 * components:
 *  schemas:
 *   Sales:
 *    type: object
 *    properties:
 *     identificacion:
 *      type: string
 *      description: the user id
 *     fecha:
 *      type: string
 *      description: the name user
 *     factura:
 *      type: string
 *      description: the user email
 *     tipoPago:
 *      type: string
 *      description: the user number
 *     productos:
 *      type: string
 *      description: the user direction
 *     estado:
 *      type: string
 *      description: the user password
 */

/**
 * @swagger
 * /api/getSales:
 *  post:
 *    summary: Sales user
 *    tags: [Sales]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Sales'
 *    responses:
 *      200:
 *        decription: Mostrar ventas
 */
router.post("/getSales", getSalesController);
/**
 * @swagger
 * /api/insertSales:
 *  post:
 *    summary: Sales user
 *    tags: [Sales]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Sales'
 *    responses:
 *      200:
 *        decription: Insertar ventas
 */
router.post("/insertSales", insertSalesController);
/**
 * @swagger
 * /api/updateSales:
 *  post:
 *    summary: Sales user
 *    tags: [Sales]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Sales'
 *    responses:
 *      200:
 *        decription: Actualizar ventas
 */
router.post("/updateSales", updateSalesController);
/**
 * @swagger
 * /api/deleteSales:
 *  post:
 *    summary: Sales user
 *    tags: [Sales]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Sales'
 *    responses:
 *      200:
 *        decription: Eliminar ventas
 */
router.post("/deleteSales", removeSalesController);

// PRODUCTS

router.post("/newproduct", nuevoProduct);
router.get("/products", buscarProductos);

router.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = router;
