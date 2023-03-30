import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import notesContext from "../context/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(notesContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    _id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      _id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note._id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="margin">
                <form style={{ fontFamily: "sans-serif" }}>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle < 3 || note.edescription < 5}
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="margin">
        <h2>Collection of Your Notes:</h2>
        {!notes.length && "Currently there ain't any notes in your collection"}
        <div className="row"> {console.log(notes + " Golu Molu " + typeof notes)}
          {notes.map((note) => {
            return (
              <div className="col-md-3">
                <NoteItem
                  key={note._id}
                  updateNote={updateNote}
                  note={note}
                  showAlert={props.showAlert}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
