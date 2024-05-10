const express = require("express");
const path = require("path");
const fs = require('fs');

const app = express();

// Setters
app.use(express.json());
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("PORT", process.env.PORT || 3000);

// Middleware
app.use("/", require("./routes/index"));

// Ruta para manejar la solicitud de agregar un nuevo producto
app.post('/add-product', (req, res) => {
    const { code, description, stock, value } = req.body;

    // Lee el archivo JSON
    const filePath = path.join(__dirname, './resources/files/data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

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

            // Redirige al usuario de vuelta a la página principal
            res.redirect('/');
        });
    });
});

app.listen(app.get("PORT"), () =>
    console.log(`Server listen at Port ${app.get("PORT")}`)
);
