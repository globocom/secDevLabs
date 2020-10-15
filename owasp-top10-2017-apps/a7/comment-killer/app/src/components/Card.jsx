import React from "react";

function card(props) {
    return (
        <div
            style={{
                marginLeft: 700,
                marginRight: 700,
                backgroundColor: "#D5E3E3",
                marginTop: 40,
            }}
        >
            <h3>{props.comment}</h3>
        </div>
    );
}

export default card;
