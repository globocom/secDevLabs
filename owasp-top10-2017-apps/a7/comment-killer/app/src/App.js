import React, { useEffect, useState } from "react";
import Blog from "./components/Blog.jsx";
import Comment from "./components/Comment";
import Card from "./components/Card";
import * as HTTP from "./Http.js";
import * as COMMENT from "./Comment.js";

function App() {
    document.cookie = 'checkPageRefresh=1';
    const [comment, setComment] = useState("");
    const [blog] = useState(
        "Welcome to my blog! Today we will talk about memes :) Where Does the Word “Meme” Come From ? The term “meme” was coined by Richard Dawkins, a biologist.Dawkins believed that cultural ideas are like genes.He thought that our concepts as a society spread from brain to brain, multiplying and mutating as they went.The resulting trends were his definition of a “meme.” Most modern “memes” are cultural inside jokes.They’re a way of connecting with people across the internet through unique photos that become instantly recognizable.Memes collect emotions, ideas and actions into an easy - to - translate format.Memes are ideal for the digital age. Most internet users spend around 100 minutes a day on social media.Most of our conversations today are informed by the jokes and references made online.Whether it’s a picture from a social influencer or a video from a brand, memes are affecting the language that customers speak online.This means that brands need to learn how to translate their advertising for this new world.Memes elicit better reactions from audiences because they’re tailored for social media.People naturally share memes as part of their online experience, so they’re a great way to improve engagement."
    );
    var [list, setList] = useState(["This is a nice blog!"]);

    useEffect(() => {
        async function getComments() {
            try {
                var response = await HTTP.GetComments();
                var newList = list.concat(Object.values(response.comments));
                list = newList;
                setList([...list]);

                list.forEach(function(comment) {
                    COMMENT.Parse(comment);
                });
            } catch(e) {
                console.warn(e);
            }
        };

        getComments();

        document.cookie = 'checkPageRefresh=0';
    }, [document.cookie.indexOf('checkPageRefresh')]);

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
                        HTTP.PostComment(comment).then(response => console.log(response))
                        setList([...list, comment]);
                        COMMENT.Parse(comment);
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
