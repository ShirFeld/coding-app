import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig"
import { logInWithEmailAndPassword, getEmails } from "../firebase/firebaseFunctions"
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);


    // gives the current user email 
    let currentUserEmail = "";
    const currentUser = getAuth().currentUser;
    if (currentUser !== null) {
        currentUserEmail = currentUser.email;
    }

    useEffect(() => {
        if (loading) {
            // if loading is true the user is not log in
            console.log("hi")
            return;
        }
        else {
            const data = async () => {
                let position = await getEmails(currentUserEmail);
                console.log(currentUserEmail + " current user position")

                if (position === "Mentor") {
                    console.log(" in if ")
                    navigate("/lobby");
                }
                else if (position === "Student") {
                    console.log(" in else ")
                    navigate("/chatRoom");
                }
            }
            data()
        }


        // setCurrentUserPosition("")
    }, [user, loading]);


    return (
        <div className="login">
            <div className="login__container">
                <div >
                    <h1 style={{ "backgroundColor": "white" }}>
                        Login page
                    </h1>
                </div>

                <div className="login__textBox">
                    <input
                        type="text"
                        className="name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                    />
                </div>
                <div className="login__textBox">
                    <input
                        type="password"
                        className="name"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                </div>
                <div className="login__textBox">
                    <button
                        className="login__btn" onClick={() => logInWithEmailAndPassword(email, password)}>  Login  </button>
                    {/* className="login__btn" onClick={() => onLogin()}>  Login  </button> */}
                </div>

            </div>
        </div>
    );
}
export default Login;