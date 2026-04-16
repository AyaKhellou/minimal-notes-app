
export default function NewEntry({addNote,getText,text,getTitle,title,editId,submitEdit,date}){    
    function edit(e){
        e.preventDefault();
        submitEdit(text)
    }
    function submit(e){
        e.preventDefault();
        addNote(text)
    }
    return(
        <div className="new-entry">
            <p className="date">{date}</p>
            <h2 className="title-2">New Entry</h2>
            <form onSubmit={editId ? edit : submit}>
                <input type="text" 
                name="title" 
                id="title" 
                placeholder="enter title..."
                value={title} onChange={e=>getTitle(e.target.value)} />
                <textarea 
                name="note" 
                id="note" 
                placeholder="write note..."
                onChange={e => getText(e.target.value)}
                value={text}
                ></textarea>
                <button 
                type="submit"
                >
                    {editId ? "Edit" : "Save"}
                </button>
            </form>
        </div>
    )
}