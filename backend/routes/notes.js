const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: get all the notes using: GET "api/notes/fetchallnotes". Login required.
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Sorry! an error occured');
  }
})

// ROUTE 2: add a new note using: POST "api/notes/addnote". Login required.
router.post('/addnote', fetchUser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, tag } = req.body;
    const note = new Notes({
      title, description, tag, user: req.user.id,
    })
    const savedNote = await note.save();
    res.json(savedNote);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Sorry! an error occured');
  }
})

// Route 3: update an existing note using: PUT "/api/notes/updatenote". Login required.
router.put('/updatenote/:id', fetchUser, [
  // body('title', 'Enter a valid title').isLength({ min: 3 }),
  // body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) { newNote.title = title; }
  if (description) { newNote.description = description; }
  if (tag) { newNote.tag = tag; }
  let note = await Notes.findById(req.params.id);
  if (!note) { return res.status(404).send('Not Found'); }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send('Not Allowed');
  }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
  res.json({ note });
  try {
    
  } catch (error) {
    
  }
})

// Route 4: delete an existing note using: DELETE "/api/notes/deletenote". Login required.
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  let note = await Notes.findById(req.params.id);
  if (!note) { return res.status(404).send('Not Found'); }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send('Not Allowed');
  }
  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ "success": "Note has been deleted", note: note });
  try {
    
  } catch (error) {
    
  }
})

module.exports = router;
