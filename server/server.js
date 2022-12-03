const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');


let serviceAccount = require("./serviceAccount.json");
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// i used core because my server ans client are in different ports.
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})

// every time the client will connect to the server this func will run
io.on("connection", socket => {
    socket.on("get-document", async documentId => {
        let document = ""
        let id = ""
        // const document = findDocument(documentId)

        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        snapshot.forEach(doc => {
            if (documentId === doc.data().courseName) {
                document = doc.data().code;
                console.log(document + " &&&&")
                id = doc.id
                console.log(id + " !!!!!!!!!!!!!!!!!!!")
            }
        });


        socket.join(documentId)
        socket.emit("load-document", document)
        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })
        // fix it
        socket.on("save-document", async data => {
            // await func(documentId, data)


            const cityRef = db.collection('users').doc(id);
            const res = await cityRef.update({ code: data });

            // await urlRef.update({ code: data });



        })
    })

})

// find the id (url()) of the code in firebase
// async function findDocument(id) {
//     if (id == null) return

//     const usersRef = db.collection('users');
//     const snapshot = await usersRef.get();
//     try {
//         snapshot.forEach(doc => {
//             if (id === doc.data().courseName) {
//                 console.log(doc.data().courseName + " *************")
//                 console.log(id + "  $$$$$$$$$$$$")
//                 console.log(doc.data().code + "  $$$$$$$$$$$$")
//             }
//             return doc.data().code;
//             //   console.log(doc.id, '=>', doc.data());

//         });
//     } catch (error) {
//         console.error(error);
//     }
// }


// const func = async (documentId, data) => {

//     const cityRef = db.collection('users').doc(documentId);
//     const res = await cityRef.update({ code: data });

// }