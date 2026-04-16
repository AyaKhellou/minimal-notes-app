import NewEntry from './components/NewEntry'
import RecentEntries  from './components/RecentEntries'
import { useState , useEffect } from 'react'
import { nanoid } from 'nanoid'
import { NotebookPen  } from 'lucide-react'

export default function  App() {
  const [editId , setEditId] = useState('');

  const [text, setText] = useState("");

  const [title, setTitle] = useState("");

  const date = new Date().toLocaleDateString();


  function getText(inputText){
    setText(inputText)
  }
  function getTitle(inputTitle){
    setTitle(inputTitle)
  }


  const [notes, setNotes] = useState(()=>{
    const items = localStorage.getItem('notes')
    if (items === null) return []
    return JSON.parse(items)
  })

  function addNote(text){
    if(title.trim() === '' || text.trim() === '') return;
    setNotes(prev => [...prev,{title:title, text:text,id:nanoid(),date:date}])
    setText('')
    setTitle('')
  }

  useEffect(()=>{
    localStorage.setItem('notes', JSON.stringify(notes))
  },[notes])

  function deleteNote(id){
    setNotes(prev => prev.filter(item=> item.id !== id))
  }
  
  function editNote(id){
    const note = notes.find(item => item.id === id)
    setText(note.text)
    setTitle(note.title)
    setEditId(id)
  }

  function submitEdit(text){
    setNotes(prev =>
      prev.map(item =>
        item.id === editId ? {...item ,text:text } : item
      )
    )
    setText('')
    setTitle('')
    setEditId('')
  }
  return(
    <div className='app'>
      <h1 className='title'>
        <NotebookPen size={40}/>
        <span>My notes app</span>
        </h1>
      <div className='container'>
        <RecentEntries 
        notes={notes} 
        deleteNote={deleteNote} 
        editNote={editNote}/>
        <NewEntry 
        addNote={addNote} 
        getText={getText} text={text} editId={editId}
        getTitle={getTitle} title={title}
        submitEdit={submitEdit}
        date={date} />
      </div>
    </div>
  )
}