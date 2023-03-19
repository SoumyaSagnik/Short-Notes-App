import React from "react";

const Note = ({
  topic,
  content,
  isAddEditActive,
  deleteClicked,
  editClicked,
}) => {
  return (
    <div className="note">
      <div className="note-top">
        <h2>{topic}</h2>
        {!isAddEditActive && (
          <div className="note-mod">
            <button onClick={editClicked}>&#9998;</button>
            <button onClick={deleteClicked}>&#128465;</button>
          </div>
        )}
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Note;
