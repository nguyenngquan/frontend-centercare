export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

export const objToArrObj = (obj) => {
  if (
    !isNullOrUndefined(obj) &&
    typeof obj === "object" &&
    !(obj instanceof Array)
  ) {
    return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  }
  return [];
};

export const parseToken = () => {
  const token = localStorage.getItem("token");
  const payload = atob(token.split(".")[1]);
  return JSON.parse(payload);
};
