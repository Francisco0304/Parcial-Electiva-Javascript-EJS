const express = require("express");
const path = require("path");
const fs = require('fs');

const app = express();

// Setters
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("PORT", process.env.PORT || 3000);

// Middleware
app.use("/", require("./routes/index"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar la solicitud de agregar un nuevo producto
app.post('/add-product', (req, res) => {
    const { code, description, stock, value } = req.body;

    console.log("dato", code);
    // Verifica si los campos requeridos están presentes en la solicitud
    if (!code || !description || !stock || !value) {
        return res.status(400).send('Faltan datos del producto');
    }

    // Verifica si el stock y el valor son números válidos
    if (isNaN(stock) || isNaN(value)) {
        return res.status(400).send('El stock y el valor deben ser números válidos');
    }

    // Lee el archivo JSON
    const filePath = path.join(__dirname, './resources/files/data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        try {
            // Parsea los datos JSON
            const jsonData = JSON.parse(data);

            // Agrega el nuevo producto al objeto JSON
            jsonData.products[code] = {
                code,
                description,
                stock: parseInt(stock),
                value: parseFloat(value)
            };

            // Escribe los datos actualizados de vuelta al archivo JSON
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error interno del servidor');
                }

                // Envía una respuesta JSON indicando éxito
                res.json({ success: true, message: 'Producto agregado correctamente' });
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    });
});

app.listen(app.get("PORT"), () =>
    console.log(`Server listen at Port ${app.get("PORT")}`)
);
