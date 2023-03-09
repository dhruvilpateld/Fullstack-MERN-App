import { useState,useEffect } from 'react';

const server_base="http://localhost:8080"

function App() {
  const [notes,setNotes]=useState([]);
  const [popupActive,setPopupActive]=useState(false);
  const [newNote,setNewNote]=useState({title:"",content:""});

  useEffect(()=>{
    GetNotes();
  },[])

  const GetNotes=()=>{
    fetch(server_base + "/note-list")
      .then(res=>res.json())
      .then(data=>setNotes(data))
      .catch(err=>console.log(err));
  }

  const deleteNote=async id=>{
    const data=await fetch(server_base+"/delete-note/"+id,{
      method:"DELETE"
    }).then(res=>res.json());

    setNotes(notes=>notes.filter(note=>note._id!==data.result._id));
  }

  const addnote=async(e)=>{
    e.preventDefault();
    const {title,content} = newNote;
    const data=await fetch(server_base+'/add-note',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        title,content
      })
    }).then(res=>res.json())
    setNotes([...notes, data]);
    setNewNote({title:"",content:""})
    setPopupActive(false);
  }

  const inputChangeHandler=(e)=>{
    setNewNote({...newNote,[e.target.name]:e.target.value})
  }

  return (
    <div className="App">
      <h1>Your Notes</h1> 
 
      <div className="notes">
        {notes.map(note=>(
          <div className="Note" key={note._id}>
            <div className="title">
              <h4>{note.title}</h4>
              <div className="content">{note.content}</div>
              <div className="deleteNote" onClick={()=>deleteNote
                (note._id)}>X</div>
            </div>
          </div>
        ))}
      </div>
      <div className="addPopUp" onClick={()=>setPopupActive(true)}>+</div>
    
    {popupActive ? (
      <div className="popUp">
        <div className="closePopUp" onClick={()=>setPopupActive(false)}>X</div>
        <div className="content">
          <h3>Add New Note</h3>
          <input 
          type="text"
          name="title"
          id='title'
          value={newNote.title}
          className='add-note-input'
          placeholder='Add Title'
          onChange={inputChangeHandler}
          />
          <input 
          type="text"
          name="content"
          id='content'
          value={newNote.content}
          className='add-note-input'
          placeholder='Add Content'
          onChange={inputChangeHandler}
          />
          <div className="button" onClick={addnote}>Create Note</div>
        </div>
      </div>
    ) : '' }
    </div>
  );
}

export default App;
