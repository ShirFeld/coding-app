import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import "./Courses.css";
import { getStudents, getStudentsId } from "../firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { setDoc, doc, collection, query, getDocs, where, updateDoc, } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


function Student(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [students, setStudents] = useState([]);
    const [studentsId, setStudentsId] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getStudents().then((students) => {
            setStudents(students);
        })
            .catch((err) => {
                console.log("getUsers " + err);
            });
    }, []);


    useEffect(() => {
        getStudentsId().then((students) => {
            setStudentsId(students);
        })
            .catch((err) => {
                console.log("getUsersID " + err);
            });
    }, []);



    const addUuid = async (id, courseName, student) => {
        let n = ""
        const user = doc(db, "users", id);

        if (student.courseName === undefined || student.courseName === "") {
            n = uuidV4()
            navigate(`/documents/${n}`)
            await updateDoc(user, {
                courseName: n,
            });
        }
        else {
            navigate(`/documents/${student.courseName}`)
        }
    }


    const fun = (coursName) => {
        coursName = coursName.substring(0, coursName.indexOf(' '));
        return coursName
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                students list
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton >
                    <Modal.Title >Students list</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container >
                        <Col >
                            {/* <Col className="d-flex  "> */}
                            {students.map((student, index) => {
                                return (
                                    <Card key={index}>
                                        <Card.Body >
                                            <Card.Title>{student.name}</Card.Title>
                                            <Button onClick={() => addUuid(studentsId[index], fun(props.coursName), student)} style={{ "fontSize": "15px" }} variant="primary">Go to the code</Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </Col>
                    </Container>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Student;