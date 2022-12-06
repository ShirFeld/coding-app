import React, { useCallback, useEffect, useState } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import "./TextEditor.css"
import { io } from 'socket.io-client'
import { useParams } from "react-router-dom";



export default function TextEditor() {
    
    const SAVE_INTERVAL_MS = 2000
    const { id: documentId } = useParams() // the id from the url
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()



    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents())
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])


    // tool bar items
    const TOOLBAR_OPTIONS = [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["image", "code-block"],

    ]

    // the connection to the server
    useEffect(() => {
        // const s = io(process.env.REACT_APP_SERVER_URL)
        const s = io(process.env.REACT_APP_SERVER_URL)
        setSocket(s);

        return () => {
            s.disconnect()
        }
    }, [])


    // shir

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", document => { // the user can write
            quill.setContents(document)
            quill.enable()
        })

        socket.emit("get-document", documentId)
        //console.log(documentId + "   documentId")
    }, [socket, quill, documentId])




    // this useEffect will receive the changes from other client
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = delta => {
            quill.updateContents(delta)
        }
        socket.on("receive-changes", handler)

        return () => {
            socket.off("receive-changes", handler)
        }
    }, [socket, quill])






    // this useEffect will send the server every time our quill is change (ths doc) (delta - the things have that changed.)
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return
            socket.emit("send-changes", delta) // the user has made the changes so we send it to the server
        }
        quill.on("text-change", handler)

        return () => {
            quill.off("text-change", handler)
        }
    }, [socket, quill])





    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } })

        q.disable(false) // the user can not write
        q.setText("Loading...")
        setQuill(q)

    }, [])

    return (
        <div className="container" ref={wrapperRef}></div>
    )
}
