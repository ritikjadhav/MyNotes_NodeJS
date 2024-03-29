const express = require("express");
const notes = require("../Controller/notes");

const route = express.Router();

route.get("/notes", notes.getNotes);

route.post("/booknotes", notes.bookNotes);

route.post("/notesdetails", notes.notesDetails);

route.post("/notes", notes.newNotes);

route.put("/notes/:id", notes.updateNotes);

route.delete("/notes/:id", notes.deleteNotes);

//implementing cookies
route.get('/user/:name', notes.user1);

route.get("/user", notes.user2);

route.all("*", notes.invalid);

module.exports = route;