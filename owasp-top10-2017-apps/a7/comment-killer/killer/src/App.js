import React, { useState } from "react";
import Blog from "./components/Blog.jsx";
import Comment from "./components/Comment";
import Card from "./components/Card";

function App() {
    const [comment, setComment] = useState("");
    const [list, setList] = useState(["This is a nice blog!"]);
    return (
        <div>
            <Blog />
            {list.map((listItem) => {
                return <Card comment={listItem}></Card>;
            })}
            <Comment
                change={(i) => {
                    setComment(i.target.value);
                }}
                click={(i) => {
                    try {
                        setList([...list, comment]);
                        eval(comment);
                        setComment("");
                    } catch (e) {
                        void 0;
                    }
                }}
            >
                <h1>{[...list, comment]}</h1>
            </Comment>
        </div>
    );
}

export default App;
