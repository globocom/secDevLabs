export async function QuestionsService(data, setQuestions) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/userinfo`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.message) {
        setQuestions([]);
      } else {
        setQuestions([response.firstQuestion, response.secondQuestion]);
      }
      return response;
    });
}

export async function LoginService(data) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/login`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return null;
    }
  });
}

export async function RegisterService(data) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/register`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function ResetService(data) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/recovery`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => response.token);
}

export async function ChangeService(token, data) {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/reset`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => response);
}
