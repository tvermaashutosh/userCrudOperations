import React, { useContext } from "react";

import { ReactDOM } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import notesContext from "../context/noteContext";

const NoteItem = (props) => {
  const context = useContext(notesContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <>
      <div
        className="card"
        style={{ marginRight: "20px", marginBottom: "20px" }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title align-items-bottom">{note.title}</h5>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="mx-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted successfully", "success");
              }}
            />
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="mx-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                updateNote(note);
              }}
            />
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
