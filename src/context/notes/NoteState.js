import React from 'react'
import NoteContext from './noteContext'
import { useState } from 'react'


const NoteState = (props) => {
  const host = "http://localhost:5000/";
  /********Example Context Api ********/
  //     const s1={
  //         "name":"Nand",
  //         "age":"20"
  //     }

  //      const [state, setstate] = useState(s1);

  //      const update=()=>{
  //          setTimeout(() => {
  //              setstate({
  //                 "name":"Nittin",
  //                 "age":"200"
  //              })
  //          }, 5000);
  //      }



  const notesInitial = [];


  const [notes, setNotes] = useState(notesInitial);

  /************************************************************ *********************************************************************/

  // ADD A NOTE
  const getNotes = async () => {
    console.log("Fetch all  Notes");
    //ADD NOTE USING API


    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });
   const json=await response.json();
   setNotes(json);
     
  }


  /********************************************** ********************************************************************************/
  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    //ADD NOTE USING API
    
    
    const response = await fetch(`${host}api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note=await response.json();
    setNotes(notes.concat(note));
    // console.log(json);
    //ADD A NOTE 
    // const note = {
    //   "_id": json._id,
    //   "user": json.user,
    //   "title": `${title}`,
    //   "description": `${description}`,
    //   "tag": `${tag}`,
    //   "date": json.date,
    //   "__v": 0
    // };
    console.log("Note added successfully");
  }


  /******************************************************************** ***************************************************************/

  // DELETE A NOTE
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json=await response.json();
    console.log(json.message);

    const newNotes = notes.filter((note) => { return note._id !== id });
    // console.log("deleted succesfully");
    setNotes(newNotes)
  }




  /********************************************************************* *************************************************************/
  // UPDATE A NOTE
  const updateNote = async (id, title, description, tag) => {
    // FETCH NOTES USING API
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    // console.log(json);
    //LOGIC TO EDIT ON CLIENT
  let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }


  return (
    //   <NoteContext.Provider value={{state,update}}>//example  in about.js
    // <NoteContext.Provider value={{notes,setNotes}}>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>

  )
}


export default NoteState



