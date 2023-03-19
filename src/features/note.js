import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const noteSlice = createSlice({
  name: "notes",
  initialState: { value: initialState },
  reducers: {
    addNote: (state, action) => {
      state.value.push(action.payload);
    },
    editNote: (state, action) => {
      state.value.map((note) => {
        if (note.id === action.payload.id) {
          note.topic = action.payload.topic;
          note.content = action.payload.content;
        }
      });
    },
    deleteNote: (state, action) => {
      state.value = state.value.filter((note) => note.id !== action.payload.id);
    },
  },
});

export const { addNote, editNote, deleteNote } = noteSlice.actions;

export default noteSlice.reducer;
