import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";


// screens
import Login from './screens/Login';
import Lobby from './screens/Lobby'
import ChatRoom from './screens/ChatRoom';
import TextEditor from './components/TextEditor';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/chatRoom/" element={<ChatRoom />} />
          {/* <Route path="/documents" element={<Navigate replace to={`/documents/${uuidV4()}`} />}></Route> */}
          <Route path="/documents" element={<Navigate replace to={`/documents/:id`} />}></Route>
          <Route path="/documents/:id"
            element={<TextEditor />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
