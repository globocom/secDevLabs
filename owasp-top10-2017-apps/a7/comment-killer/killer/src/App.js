import React, { useState } from "react";
import Blog from "./components/Blog.jsx";
import Comment from "./components/Comment";

function App() {
    const [change, setChange] = useState("");
    return (
        <div>
            <Blog />
            <Comment
                change={(i) => {
                    setChange(i.target.value);
                }}
                click={(i) => {}}
            ></Comment>
            <h1>{change}</h1>
        </div>
    );
}

export default App;
