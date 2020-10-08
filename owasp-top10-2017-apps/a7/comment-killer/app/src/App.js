import React, { useState } from "react";
import Blog from "./components/Blog.jsx";
import Comment from "./components/Comment";
import Card from "./components/Card";

function App() {
    const [comment, setComment] = useState("");
    const [blog, setBlog] = useState(
        "Welcome to my blog! Today we will talk about memes :) Where Does the Word “Meme” Come From ? The term “meme” was coined by Richard Dawkins, a biologist.Dawkins believed that cultural ideas are like genes.He thought that our concepts as a society spread from brain to brain, multiplying and mutating as they went.The resulting trends were his definition of a “meme.” Most modern “memes” are cultural inside jokes.They’re a way of connecting with people across the internet through unique photos that become instantly recognizable.Memes collect emotions, ideas and actions into an easy - to - translate format.Memes are ideal for the digital age. Most internet users spend around 100 minutes a day on social media.Most of our conversations today are informed by the jokes and references made online.Whether it’s a picture from a social influencer or a video from a brand, memes are affecting the language that customers speak online.This means that brands need to learn how to translate their advertising for this new world.Memes elicit better reactions from audiences because they’re tailored for social media.People naturally share memes as part of their online experience, so they’re a great way to improve engagement."
    );
    const [list, setList] = useState(["This is a nice blog!"]);

    return (
        <div>
            <Blog blog={blog} />
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
