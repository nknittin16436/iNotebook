import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const {note,editNote}=props;
    const context = useContext(noteContext );
    // const {notes,setNotes}=context;
    const {deleteNote}=context;
   
  return (
      <div className='col-md-4 my-3'>
          <div className="card">
  <div className="card-body">
      <div className='d-flex align-items-center'>
    <h5 className="card-title my-0">{note.title}</h5>
    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{editNote(note)}}></i>
    <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success");}}></i> 

      </div>
    <p className="card-text"> {note.description} </p> 
  </div>
</div>
      
     
      </div>
      )
}

export default NoteItem