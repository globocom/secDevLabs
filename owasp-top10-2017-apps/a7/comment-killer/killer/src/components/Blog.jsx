import React from "react";

function blog() {
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <img
                    style={{ borderRadius: 1000, height: 100 }}
                    src="https://i.kym-cdn.com/entries/icons/facebook/000/032/279/Screen_Shot_2019-12-30_at_11.26.24_AM.jpg"
                ></img>
                <h1>Written by Meme-Man</h1>
            </div>
            <div
                style={{
                    marginLeft: 300,
                    marginRight: 300,
                    backgroundColor: "#D5E3E3",
                    textAlign: "center",
                    borderRadius: 100,
                }}
            >
                <h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do
                    <br />
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Eu
                    <br />
                    lobortis elementum nibh tellus molestie. Vel pharetra vel
                    turpis
                    <br />
                    nunc eget. Leo vel fringilla est ullamcorper eget nulla
                    facilisi
                    <br />
                    etiam. Eget lorem dolor sed viverra ipsum nunc aliquet
                    bibendum.
                    <br />
                    Malesuada fames ac turpis egestas maecenas pharetra
                    convallis.
                    <br />
                    Dignissim enim sit amet venenatis. Vitae turpis massa sed
                    <br />
                    elementum. Suspendisse potenti nullam ac tortor. Id aliquet
                    <br />
                    lobortis elementum nibh tellus molestie. Vel pharetra vel
                    turpis
                </h3>
            </div>
            <hr style={{ marginTop: 50 }}></hr>
            <div style={{ textAlign: "center" }}>
                <h3>Don't like it? Use XSS and comment!</h3>
            </div>
        </div>
    );
}

export default blog;
