import { useState, useEffect } from "react";

export default function NoteModal({ note, onClose, onSave }) {
  const [form, setForm] = useState({ note_title: "", note_content: "" });

  useEffect(() => {
    if (note) setForm({ note_title: note.note_title, note_content: note.note_content });
  }, [note]);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{note ? "Edit Note" : "Add Note"}</h3>
        <input placeholder="Title" value={form.note_title} onChange={(e) => setForm({ ...form, note_title: e.target.value })} />
        <textarea placeholder="Content" value={form.note_content} onChange={(e) => setForm({ ...form, note_content: e.target.value })} />
        <div className="modal-actions">
          <button onClick={() => onSave(form)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
