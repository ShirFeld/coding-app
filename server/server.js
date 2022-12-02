
let admin = require("firebase-admin");
let serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore()
let array_data = [];  // before the id of the users
let customerRef = db.collection("users")
customerRef.get().then((querySnapshot) => {
    querySnapshot.forEach(document => {
        array_data.push(document);
    })

})









// i used core because me server ans client are in different ports.
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})


// every time the client will connect to the server this func will run
io.on("connection", socket => {
    socket.on("get-document", async documentId => {
        const document = findDocument(documentId)
        socket.join(documentId)
        socket.emit("load-document", document.code)
        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        // fix it
        socket.on("save-document", async data => {
            await func(documentId, data)
        })
    })


})



// find the id (url()) of the code in firebase
async function findDocument(id) {
    if (id == null) return

    array_data.forEach((d) => {
        if (id === d.data().courseName) {
            return d.data();
        }

    })
}


const func = (documentId, data) => {

    const washingtonRef = doc(db, "cities", documentId);
    updateDoc(washingtonRef, {
        code: data
    });
}