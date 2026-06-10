import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export const fetchNotes = createAsyncThunk("notes/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/notes/");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const createNote = createAsyncThunk("notes/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/notes/", payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/notes/${id}/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteNote = createAsyncThunk("notes/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/notes/${id}/`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createNote.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateNote.fulfilled, (state, action) => {
        state.items = state.items.map((note) =>
          note.id === action.payload.id ? action.payload : note
        );
      })

      // DELETE
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.items = state.items.filter((n) => n.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
