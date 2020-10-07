import React from "react";

import logo from "./image/logo.jpg";

function blog() {
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
                <h3>
                    Welcome to my blog! Today we will talk about memes :) Where
                    Does the Word “Meme” Come From? The term “meme” was coined
                    by Richard Dawkins, a biologist. Dawkins believed that
                    cultural ideas are like genes. He thought that our concepts
                    as a society spread from brain to brain, multiplying and
                    mutating as they went. The resulting trends were his
                    definition of a “meme.” Most modern “memes” are cultural
                    inside jokes. They’re a way of connecting with people across
                    the internet through unique photos that become instantly
                    recognizable. Memes collect emotions, ideas and actions into
                    an easy-to-translate format. Memes are ideal for the digital
                    age. <br />
                    Most internet users spend around 100 minutes a day on social
                    media. Most of our conversations today are informed by the
                    jokes and references made online. Whether it’s a picture
                    from a social influencer or a video from a brand, memes are
                    affecting the language that customers speak online. This
                    means that brands need to learn how to translate their
                    advertising for this new world. Memes elicit better
                    reactions from audiences because they’re tailored for social
                    media. People naturally share memes as part of their online
                    experience, so they’re a great way to improve engagement.
                </h3>
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
