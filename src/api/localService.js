export let userLocalStorage = {
  //   get: () => {
  //     // return localStorage.getItem("USER") ? JSON.parse(localStorage.getItem("USER")) : null;
  //     let dataJson = localStorage.getItem("USER");
  //     return JSON.parse(dataJson);
  //   },
  get: () => (localStorage.getItem("USER") ? JSON.parse(localStorage.getItem("USER")) : null),
  set: userDataContentInfo => {
    let dataJson = JSON.stringify(userDataContentInfo);
    localStorage.setItem("USER", dataJson);
  },
  remove: () => {
    localStorage.removeItem("USER");
  },
};
