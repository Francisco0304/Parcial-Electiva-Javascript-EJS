(() => {
    alert("yessssss");
})();

document.getElementById("btnSend").addEventListener("click", () => {
    //Se va a crear un objeto JSON con los datos que se envian al servidor
    //TODO Obtener los datos de los elementos de la vista del usuario

    const book = {
        id: 69,
        title: "Juego de Tronos",
        author: "George R. R. Martin",
        pages: 875,
    };

    console.log(JSON.stringify(book));

    const URL = "http://localhost:3000";
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    })
        .then((data) => data.json())
        .then((data) => console.log(data))
        .catch((err) => alert(err));
});
