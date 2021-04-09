// Dependencies
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT||3000;

//Express
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes/", (req, res) => {
    var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log(data);
    res.json(data);
});

app.post("/api/notes", (req, res) => {
    var allNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var newNote = req.body;
    var id = allNotes.length;

    newNote.id = id + 1;
    allNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));
    console.log("Note Saved");
    res.json(allNotes);
});



// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));