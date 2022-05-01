import React from 'react'
import { useContext ,useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext );
    // const {notes,setNotes}=context;
    const {addNote}=context;
    const [note, setNote] = useState({title:"",description:"",tag: ""})

    const handleClick=(e)=>{
        e.preventDefault();
addNote(note.title,note.description,note.tag);
setNote({title:"",description:"",tag: "defult"});
props.showAlert("Note added Successfully","success");
    }
    const onChange=(e)=>{

        setNote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div className='container mt-3'>
    <h1>Add A note</h1>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}  value={note.title} required minLength={5} placeholder="Enter atleast 5 characters"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={onChange}   value={note.description} required minLength={5}  placeholder="Enter atleast 5 characters"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
  </div>
  <button disabled={note.title<5 || note.description<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
    </div>
  )
}

export default AddNote