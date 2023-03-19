import "./App.css";
import Note from "./components/Note";
import { addNote, editNote, deleteNote } from "./features/note";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";

const App = () => {
  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notes.value);
  const topicRef = useRef(null);
  const contentRef = useRef(null);
  const [isAddScreen, setIsAddScreen] = useState(false);
  const [isEditScreen, setIsEditScreen] = useState(false);
  const [editTopicText, setEditTopicText] = useState("");
  const [editContentText, setEditContentText] = useState("");
  const [noteId, setNoteId] = useState(0);

  function isValidInput() {
    return (
      topicRef.current &&
      topicRef.current.value.trim() !== "" &&
      contentRef.current &&
      contentRef.current.value.trim() !== ""
    );
  }

  function handleAddNote() {
    if (isValidInput()) {
      dispatch(
        addNote({
          id:
            notesList.length !== 0 ? notesList[notesList.length - 1].id + 1 : 1,
          topic: topicRef.current.value,
          content: contentRef.current.value,
        })
      );

      topicRef.current.value = "";
      contentRef.current.value = "";
    }
    setIsAddScreen(false);
  }

  function handleAddEditClose() {
    if (isAddScreen) setIsAddScreen(false);
    if (isEditScreen) setIsEditScreen(false);
  }

  function handleOpenClose() {
    setIsAddScreen(!isAddScreen);
  }

  function handleDeleteNote(id) {
    dispatch(deleteNote({ id: id }));
  }

  function handleEditClick(id) {
    setIsEditScreen(true);
    setEditTopicText(notesList[id - 1].topic);
    setEditContentText(notesList[id - 1].content);
    setNoteId(id);
  }

  function handleEditNote() {
    dispatch(
      editNote({
        id: noteId,
        topic: topicRef.current.value,
        content: contentRef.current.value,
      })
    );

    // if user makes both topic and current empty then delete note
    if (
      topicRef.current.value.trim() === "" &&
      contentRef.current.value.trim() === ""
    )
      handleDeleteNote(noteId);
    setIsEditScreen(false);
  }

  return (
    <div className="App">
      {(isAddScreen || isEditScreen) && (
        <div id="dimScreen">
          <div className="addNoteContainer">
            <div className="add-edit-screen">
              <div className="add-edit-screen-top">
                <h2>{isEditScreen ? "Edit Note" : "Add Note"}</h2>
                <button id="close" onClick={handleAddEditClose}>
                  &times;
                </button>
              </div>
              <textarea
                name="topic"
                id="topicInput"
                placeholder="Topic..."
                spellCheck={false}
                ref={topicRef}
                defaultValue={isEditScreen ? editTopicText : ""}
                onChange={(e) => setEditTopicText(e.target.value)}
              ></textarea>
              <textarea
                name="content"
                id="contentInput"
                placeholder="Contnet..."
                spellCheck={false}
                ref={contentRef}
                defaultValue={isEditScreen ? editContentText : ""}
                onChange={(e) => setEditContentText(e.target.value)}
              ></textarea>
              <button
                id="done"
                onClick={isEditScreen ? handleEditNote : handleAddNote}
              >
                {isEditScreen ? "Edit" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="header">
        <h1>Short Notes</h1>
        {!isAddScreen && !isEditScreen && (
          <button id="addNote" onClick={handleOpenClose}>
            Add Note
          </button>
        )}
      </div>
      <div className="displayNotes">
        {notesList.length === 0 && (
          <div id="emptyMessage">Create note to display</div>
        )}
        {notesList.map((note) => (
          <Note
            key={note.id}
            topic={note.topic}
            content={note.content}
            isAddEditActive={isAddScreen || isEditScreen}
            deleteClicked={() => handleDeleteNote(note.id)}
            editClicked={() => handleEditClick(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
