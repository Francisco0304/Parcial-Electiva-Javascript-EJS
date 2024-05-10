const router = require("express").Router();
const data = require("./../resources/files/data.json");

router.get("/", (req, res) =>
    res.render("index.ejs", { title: "Gestión de Productos", data: data.products })
);

router.get("/get-product/:code", (req, res) => {
    const { code } = req.params;

    if (data.products.hasOwnProperty(code)) {
        const product = data.products[code];

        return res.status(200).json({ state: true, data: product });
    }

    return res.status(200).json({ state: false });
});

router.get("/add-product", (req, res) => {
    res.render("new-product.ejs", { title: "Agregar Producto" });
});

router.post("/", (req, res) => {
    const { code, description, stock, value, stockMin } = req.body;
    if (!data.products.hasOwnProperty(code)) {
        data.products[code] = {
            code,
            description,
            stock,
            value,
            stockMin,
        };

        return res.status(200).json({ state: true, data: data.products[code] });
    }

    return res.status(200).json({ status: false, message: "Producto ya registrado" });
});

module.exports = router;
