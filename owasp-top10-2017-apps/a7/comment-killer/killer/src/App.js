import React, { useState } from "react";
import Blog from "./components/Blog.jsx";
import Comment from "./components/Comment";

function App() {
    const [comment, setComment] = useState("");
    return (
        <div>
            <Blog />
            <Comment
                change={(i) => {
                    setComment(i.target.value);
                }}
                click={(i) => {
                    try {
                        eval(comment);
                        setComment("");
                    } catch (e) {
                        alert("nope");
                    }
                }}
            ></Comment>
            <h1>{comment}</h1>
        </div>
    );
}

export default App;
