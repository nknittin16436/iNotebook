import React from 'react'
import { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate=useNavigate();
    const ref = useRef(null);
    const refClose = useRef(null);
    // const {notes,setNotes}=context;
    const { notes, getNotes,updateNote} = context;
    const [note, setNote] = useState({id:"",updatedTitle:"",updatedDescription:"",updatedTag: ""})
    useEffect(() => {
        if(localStorage.getItem('token')){

            getNotes();
        } 
        else{
            navigate('/login')
        }
        //eslint-disable-next-line
    }, []);


    const editNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, updatedTitle:currentNote.title,updatedDescription:currentNote.description,updatedTag:currentNote.tag}); 
    }
    const handleClick=(e)=>{
        e.preventDefault();
        console.log("updating..");
        updateNote(note.id,note.updatedTitle,note.updatedDescription,note.updatedTag);
        refClose.current.click();
        props.showAlert("Updated Successfully","success");
    }
    const onChange=(e)=>{

        setNote({...note,[e.target.name]:e.target.value})

    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="updatedTitle" name='updatedTitle' value={note.updatedTitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="updatedDescription" name='updatedDescription' value={note.updatedDescription} onChange={onChange}  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="updatedTag" name='updatedTag' value={note.updatedTag} onChange={onChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container row my-3'>
                <h1>Your notes</h1>
                {notes.length===0 && "No notes to display"}
                {notes.map((note) => {
                    return <NoteItem key={note._id} editNote={editNote} note={note} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes