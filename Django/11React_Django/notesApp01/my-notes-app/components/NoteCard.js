export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <h4>{note.note_title}</h4>
      <p>{note.note_content}</p>
      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
