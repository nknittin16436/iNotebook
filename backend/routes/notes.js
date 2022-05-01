const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1 /***GET ALL NOTES OF LOGGEDIN USER BY GET localhost:5000/api/notes/fetchallnotes *********/LOGIN REQUIRED
router.get('/fetchallnotes', fetchUser, async (req, res) => {

      try {

            const notes = await Notes.find({ user: req.user.id });
            res.json(notes);
      } catch (error) {
            res.status(500).send("Internal server error");
      }
})



//ROUTE 2 /***GET ALL NOTES OF LOGGEDIN USER BY POST localhost:5000/api/notes/addnote/ *********/LOGIN REQUIRED
router.post('/addnote', fetchUser, [
      body('title', 'Enter a valid title').isLength({ min: 3 }),
      body('description', 'Description must be atleast five characters').isLength({ min: 5 }),

], async (req, res) => {
      const { title, description, tag } = req.body;
      //  IF ERROR IN INPUT BY USER RETURN ERROR CODE 400 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
      }

      try {

            const note = new Notes({
                  title, description, tag, user: req.user.id
            })

            const savedNote = await note.save();
            res.json(savedNote);
      } catch (error) {
            res.status(500).send("Internal server error");
      }
})





//ROUTE 3 /***UPDATE  NOTES OF LOGGEDIN USER BY PUT localhost:5000/api/notes/updatenote/:id *********/LOGIN REQUIRED
router.put('/updatenote/:id', fetchUser, async (req, res) => {
      const { title, description, tag } = req.body;
// .CREATE A NEW NOTE
const newNote={};

      if(title){
              newNote.title=title;
      }
      if(description){
              newNote.description=description;
      }
      if(tag){
              newNote.tag=tag;
      }
    
      // FIND NOTE TO BE UPDATED AND UPDATE IT
      // const note=Notes.findByIdAndUpdate
      let note= await Notes.findById(req.params.id);

      if(!note){
            return res.status(404).send("Note not found");
      }

      if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Aloowed");
      }

      note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});

      res.json(note);
     
})



//ROUTE 4 /***UPDATE  NOTES OF LOGGEDIN USER BY DELETE localhost:5000/api/notes/deletenote/:id *********/LOGIN REQUIRED
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
     
      // FIND NOTE TO BE UPDATED AND UPDATE IT
      // const note=Notes.findByIdAndUpdate
      let note= await Notes.findById(req.params.id);

      if(!note){
            return res.status(404).send("Note not found");
      }

      if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Aloowed");
      }

      note=await Notes.findByIdAndDelete(req.params.id,);

      res.json({message:"Deleted succesfully"});
     
})
module.exports = router;