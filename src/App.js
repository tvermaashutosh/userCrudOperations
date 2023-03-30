import './App.css';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useState } from 'react';

// import ReactDOM from 'react-dom'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faTrashCan, faPenToSquare)

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 900);
  }
  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <div className="container">
        <NoteState>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/home" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
          </Routes>
        </NoteState>
      </div>
    </>
  );
}

export default App;
