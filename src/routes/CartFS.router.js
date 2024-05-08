const path = require("path");
const CartsManager = require("../dao/CartsfsManager.js");
const cartsPath = path.join(__dirname, "..", "data", "carrito.json");
const cartsManager = new CartsManager(cartsPath);

const { Router } = require("express");

const router = Router();
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
      const carrito = await cartsManager.getCartById(parseInt(cid));
      if (carrito) {
        res.json(carrito);
    } else {
      res.status(404).json({ error: `Carrito con ID ${cid} no encontrado` });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

router.post("/", async (req, res) => {
  try {
    const cartNumber = await cartsManager.createCart();
    if (cartNumber) {
      res.json(`Carrito con id ${cartNumber} creado exitosamente`);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al inicializar el carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  if (isNaN(cid)) {
    return res.status(400).json({ error: `El cid debe ser numérico` });
  }
  if (isNaN(pid)) {
    return res.status(400).json({ error: `El pid debe ser numérico` });
  }

  try {
    const result = await cartsManager.addProductToCart(
      parseInt(cid),
      parseInt(pid)
    );
    if (typeof result === "string") {
      return res.status(404).json({ error: result });
    }
    res
      .status(200)
      .json({
        message: `Producto con pid ${pid} agregado con éxito al carrito ${cid} `,
      });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito." });
  }
});

module.exports = {
  router,
};