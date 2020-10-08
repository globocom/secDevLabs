import React from "react";

import logo from "./image/logo.jpg";

function blog(props) {
    return (
        <div>
            <div
                style={{
                    backgroundColor: "#D5E3E3",
                    textAlign: "center",
                    paddingLeft: 300,
                    paddingRight: 300,
                }}
            >
                <h3>{props.blog}</h3>
            </div>
            <div style={{ textAlign: "center" }}>
                <img
                    style={{ borderRadius: 1000, height: 100 }}
                    src={logo}
                ></img>
                <h1>Written by Meme-Man</h1>
            </div>
            <hr style={{ marginTop: 50 }}></hr>
            <div style={{ textAlign: "center" }}>
                <h1>Comment section</h1>
            </div>
            <hr style={{ marginTop: 20 }}></hr>
        </div>
    );
}

export default blog;
