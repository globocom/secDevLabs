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
                        const k = comment.substring(8);

                        for (let i = 0; i < k.length; i++) {
                            if (k[i] === "<") {
                                var x = i;
                            }
                        }
                        const z = k.substring(0, x);
                        eval(z);
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
