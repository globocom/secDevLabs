export async function GetComments() {

    try {
        const response = await fetch('http://localhost:10017/comments',
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const body = await response.json();
        return body;

    } catch(e) {
        return console.warn(e)
    }
}

export function PostComment(commentToPOST) {

    return fetch('http://localhost:10017/comments',
    {
    	method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({comment: commentToPOST})
    })
    .then((response) => response.status)
    .catch(error => console.warn(error));

}