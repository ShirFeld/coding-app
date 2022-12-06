import { collection, getDocs, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";

// auth method

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export function logout() {
    return auth.signOut()
}


export const getUsers = async () => {
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
    });
    return usersList;
};


export const coursers = async () => {
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);
    const coursers = usersSnapshot.docs.map((doc) => {
        return { data: doc.data().courseName };
    });
    return coursers;
};




// gives the names of the students. This method send to Modal.js
export const getStudents = async () => {
    const students = [];
    const q = query(collection(db, "users"), where("position", "==", "Student"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        students.push(doc.data())
    });
    // console.log(mentors)
    return students;
};



// returns the id of every student. This method send to Modal.js
export const getStudentsId = async () => {
    const idis = [];
    const q = query(collection(db, "users"), where("position", "==", "Student"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        idis.push(doc.id)
    });
    // console.log(mentors)
    return idis;
};




// this method receive param from login screen. Param = currentUserEmail and than we will return the right position of this email.
export const getEmails = async (email) => {
    const position = [];
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        position.push(doc.data().position);
        // console.log(doc.data().position + " &&&&&&&&&&")
    });
    console.log(position[0] + " &&&&&&&&&&")
    return position[0];

};


// return all the codes . this method is used in Courses.
export const getCodes = async () => {
    const courses = [];
    const codesCol = collection(db, "codes");
    const codesSnapshot = await getDocs(codesCol);
    const codesList = codesSnapshot.docs.map((doc) => {
        courses.push(doc.data());
    });
    return courses;
};




