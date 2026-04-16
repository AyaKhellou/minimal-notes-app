// Main App component for the Notes App
import NewEntry from './components/NewEntry'
import RecentEntries from './components/RecentEntries'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { NotebookPen } from 'lucide-react'

export default function App() {
  // State for managing the current edit ID
  const [editId, setEditId] = useState('');

  // State for the note text
  const [text, setText] = useState("");

  // State for the note title
  const [title, setTitle] = useState("");

  // Current date for new notes
  const date = new Date().toLocaleDateString();

  // Handler to update text state
  function getText(inputText) {
    setText(inputText)
  }

  // Handler to update title state
  function getTitle(inputTitle) {
    setTitle(inputTitle)
  }

  // State for storing notes, initialized from localStorage
  const [notes, setNotes] = useState(() => {
    const items = localStorage.getItem('notes')
    if (items === null) return []
    return JSON.parse(items)
  })

  // Function to add a new note
  function addNote(text) {
    if (title.trim() === '' || text.trim() === '') return;
    setNotes(prev => [...prev, { title: title, text: text, id: nanoid(), date: date }])
    setText('')
    setTitle('')
  }

  // Effect to save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  // Function to delete a note by ID
  function deleteNote(id) {
    setNotes(prev => prev.filter(item => item.id !== id))
  }

  // Function to start editing a note
  function editNote(id) {
    const note = notes.find(item => item.id === id)
    setText(note.text)
    setTitle(note.title)
    setEditId(id)
  }

  // Function to submit an edit to a note
  function submitEdit(text) {
    setNotes(prev =>
      prev.map(item =>
        item.id === editId ? { ...item, text: text } : item
      )
    )
    setText('')
    setTitle('')
    setEditId('')
  }

  // Render the app UI
  return (
    <div className='app'>
      <h1 className='title'>
        <NotebookPen size={40} />
        <span>My notes app</span>
      </h1>
      <div className='container'>
        <RecentEntries
          notes={notes}
          deleteNote={deleteNote}
          editNote={editNote} />
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