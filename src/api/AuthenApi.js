const login = async (username, password, isNhanVien = false) => {
  var baseUrl = process.env.REACT_APP_AUTH_URL;
  baseUrl += isNhanVien == true ? "nhanviens/" : "hocviens/";
  let res = await fetch(baseUrl, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return res.json();
};

export { login };
