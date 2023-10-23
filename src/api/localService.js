export const userLocalStorage = {
  //   get: () => {
  //     // return localStorage.getItem("USER") ? JSON.parse(localStorage.getItem("USER")) : null;
  //     const dataJson = localStorage.getItem("USER");
  //     return JSON.parse(dataJson);
  //   },
  get: () => (localStorage.getItem("USER") ? JSON.parse(localStorage.getItem("USER")) : null),
  set: userDataContentInfo => {
    const dataJson = JSON.stringify(userDataContentInfo);
    localStorage.setItem("USER", dataJson);
  },
  remove: () => {
    localStorage.removeItem("USER");
  },
};
