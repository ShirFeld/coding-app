import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from './Modal'
import { getCodes } from "../firebase/firebaseFunctions"
import "./Courses.css"


function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCodes().then((courses) => {
            setCourses(courses);
        })
            .catch((err) => {
                console.log("getCourses " + err);
            });
    }, []);


    return (
        <>
            {courses.map((course, index) => {
                return (
                    <Card key={index}>
                        <Card.Body>
                            <Card.Title>{course.name}</Card.Title>
                            <Modal coursName={course.name} />
                        </Card.Body>
                    </Card>
                )
            })}
        </>

    )
}

export default Courses