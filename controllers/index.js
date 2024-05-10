const fs = require('fs');
const path = require('path');

module.exports = {
    findAll: (req, res) => {
        // Ruta al archivo JSON
        const filePath = path.join(__dirname, '../resources/files/superheroes.json');
        
        // Leer el archivo JSON
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return res.status(500).json({ state: false, message: "Error al leer el archivo JSON" });
            }
            
            // Convertir los datos JSON a objeto JavaScript
            const superheroes = JSON.parse(data);
            
            return res.status(200).json({ state: true, data: superheroes });
        });
    },

    findById: (req, res) => {
        const { id } = req.params;

        if (parseInt(id) > 100) {
            return res.status(200).json({ state: true, data: id });
        } else {
            return res.status(200).json({ state: false, data: id });
        }
    },

    save: (req, res) => {
    const { id, name, source } = req.body;
    return res.status(200).json({ state: true, data: { "id": id, "name": name, "source": source } });
},

update : (req, res)=>{
    const {Id} = req.params

    const {id,name,source} = req.body
    
    return res.status(200).json({state:true,data:req.body})
}
};
