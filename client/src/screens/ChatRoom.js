import React, { useEffect, useState } from 'react'
import { logout } from "../firebase/firebaseFunctions"
import { useNavigate } from "react-router-dom";
import { getCodes } from "../firebase/firebaseFunctions"



function ChatRoom() {
  const [codes, setCodes] = useState([]);
  const [code, setCode] = useState([]);

  useEffect(() => {
    getCodes().then((codes) => {
      setCodes(codes);
      setCode(codes)
    })
      .catch((err) => {
        console.log("getCodes " + err);
      });

  }, []);


  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout()
      navigate("/")
    } catch {
      console.log("Failed to log out")
    }
  }

  return (
    <div style={{ "textAlign": "center", "margin": "10px" }}>
      <div>
        <h3>
          Here's the TextEdit component.
        </h3>
        <textarea
          rows="20" cols="60"
          placeholder="Write something here..."

          onChange={(e) => setCode(e.target.value)}
        >
        </textarea>

      </div>
      <button onClick={() => handleLogout()}>logout</button>
    </div>

  )
}

export default ChatRoom