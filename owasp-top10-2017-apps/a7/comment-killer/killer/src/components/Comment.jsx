import React from "react";

function comment(props) {
    return (
        <div style={{ textAlign: "center", marginTop: 100 }}>
            <input
                onChange={props.change}
                style={{
                    type: "text",
                    height: 60,
                    width: 600,
                    marginBottom: 30,
                }}
            ></input>
            <br />
            <button
                type="button"
                class="btn btn-lg btn-outline-primary"
                onClick={props.click}
            >
                Comment :)
            </button>
        </div>
    );
}

export default comment;
