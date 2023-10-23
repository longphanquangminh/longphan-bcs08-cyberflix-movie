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

export const adminLocalStorage = {
  //   get: () => {
  //     // return localStorage.getItem("ADMIN") ? JSON.parse(localStorage.getItem("ADMIN")) : null;
  //     const dataJson = localStorage.getItem("ADMIN");
  //     return JSON.parse(dataJson);
  //   },
  get: () => (localStorage.getItem("ADMIN") ? JSON.parse(localStorage.getItem("ADMIN")) : null),
  set: userDataContentInfo => {
    const dataJson = JSON.stringify(userDataContentInfo);
    localStorage.setItem("ADMIN", dataJson);
  },
  remove: () => {
    localStorage.removeItem("ADMIN");
  },
};
