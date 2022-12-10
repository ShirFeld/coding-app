import './App.css';
import { BrowserRouter, Route, Routes, Navigate, HashRouter } from "react-router-dom";



// screens
import Login from './screens/Login';
import Lobby from './screens/Lobby'
import TextEditor from './components/TextEditor';

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/lobby" element={<Lobby />} />
          {/* <Route path="/documents" element={<Navigate replace to={`/documents/${uuidV4()}`} />}></Route> */}
          <Route path="/documents" element={<Navigate replace to={`/documents/:id`} />}></Route>
          <Route path="/documents/:id"
            element={<TextEditor />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
