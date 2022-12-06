import React from 'react'
import "./Lobby.css"
import Courses from '../components/Courses'
import { logout } from "../firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";

function Lobby() {


    const navigate = useNavigate();
    async function handleLogout() {
        console.log(" non")

        try {
            await logout()
            navigate("/")
        } catch {
            console.log("Failed to log out")
        }
    }


    return (
        <div className='outSide'>
            <h1 className='text'>
                Choose code block
            </h1>
            <Courses />
            <button onClick={() => handleLogout()}>logout</button>
        </div>
    )
}

export default Lobby