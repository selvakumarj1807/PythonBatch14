import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, createNote, updateNote, deleteNote } from "../store/slices/notesSlice";
import { fetchProfile } from "../store/slices/authSlice"; 
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { accessToken, username } = useSelector((s) => s.auth);
  const { items, loading } = useSelector((s) => s.notes);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (!accessToken) router.push("/signin");
    else {
      dispatch(fetchNotes());
      
    }
  }, [dispatch, accessToken]);

  const handleCreate = async (data) => {
    await dispatch(createNote(data));
    setShowModal(false);
    await dispatch(fetchNotes());
  };

  const handleUpdate = async (id, data) => {
    if (!id) return alert("Error: Note ID missing!");
    await dispatch(updateNote({ id, data })).unwrap().catch(async (err) => {
      console.error("Update failed:", err);
      await dispatch(fetchNotes());
    });
    setEditingNote(null);
    await dispatch(fetchNotes());
  };

  const handleDelete = async (id) => {
    if (!id) return alert("Error: Note ID missing!");
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await dispatch(deleteNote(id)).unwrap();
      await dispatch(fetchNotes());
      
      alert("Note deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed: " + (err.detail || JSON.stringify(err)));
      await dispatch(fetchNotes());
    }
  };

  if (!isClient) {
    return (
      <div>
        <Navbar />
        <div className="page">
          <h2 style={{ fontFamily: "Georgia, serif", color: "#5a4d36" }}>My Notes</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="page">
        <p style={{ color: "#5a4d36", fontFamily: "Georgia, serif" }}>
          Good Morning <strong>{username || "User"}</strong>!
        </p>

        <h2
          style={{
            fontFamily: "Georgia, serif",
            color: "#5a4d36",
            borderBottom: "2px dashed #c7b98b",
            display: "inline-block",
            paddingBottom: "5px",
            marginTop: 8,
          }}
        >
          My Notes
        </h2>

        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setShowModal(true)}>+ Add New Note</button>
        </div>

        {loading ? (
          <p>Loading notes...</p>
        ) : (
          <div className="notes-grid" style={{ marginTop: 12 }}>
            {items.length === 0 && <p>No notes yet!</p>}
            {items.map((n) => (
              <NoteCard
                key={n.note_id}
                note={n}
                onEdit={() => setEditingNote(n)}
                onDelete={() => handleDelete(n.note_id)}
              />
            ))}
          </div>
        )}

        {/* CREATE NOTE MODAL */}
        {showModal && (
          <NoteModal onSave={handleCreate} onClose={() => setShowModal(false)} />
        )}

        {/* EDIT NOTE MODAL */}
        {editingNote && (
          <NoteModal
            note={editingNote}
            onSave={(data) => handleUpdate(editingNote.note_id, data)}
            onClose={() => setEditingNote(null)}
          />
        )}
      </div>
    </div>
  );
}
