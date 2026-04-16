// Component for displaying a list of recent note entries
import { Trash, Pencil } from 'lucide-react'

export default function RecentEntries({ notes, deleteNote, editNote }) {
  return (
    <div className="recent-entries">
      <h2 className="title-2">Recent Entries</h2>
      <div className="entries-container">
        {
          notes.map((note) => <Entry id={note.id} date={note.date} title={note.title} text={note.text} deleteNote={deleteNote} editNote={editNote} />)
        }
      </div>
    </div>
  )
}

// Individual entry component
function Entry({ id, date, title, text, deleteNote, editNote }) {
  return (
    <div className="entry" key={id}>
      <div className="head">
        <p className='date'>{date}</p>
        <div className="buttons">
          <button className='delete' onClick={() => deleteNote(id)}>
            <Trash className='icon' />
          </button>
          <button className='edit' onClick={() => editNote(id)}>
            <Pencil className='icon' />
          </button>
        </div>
      </div>
      <div className='body'>
        <h3>{title}</h3>
        <hr />
        <p>{text}</p>
      </div>
    </div>
  )
}