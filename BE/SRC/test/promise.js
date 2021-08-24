let chalk = require("chalk");
let a = [1, 2, 3];
let s = "abc";

//1.pendding
//2.fulfilled
let p = new Promise(function (resolve, reject) {
  s = "xyc";
  s.toUpperCase();
  setTimeout(resolve, 2000);
  // resolve();
});

let users = [
  {
    id: 1,
    name: "Kien 1",
  },
  {
    id: 2,
    name: "Kien 2",
  },
  {
    id: 3,
    name: "Kien 3",
  },
];

let comments = [
  {
    id: 1,
    userId: 1,
    content: "Content 1 !!!!",
  },
  {
    id: 2,
    userId: 2,
    content: "Content 2 abc",
  },
];

function getComments() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(comments);
    }, 2000);
  });
}

function getUsersByIds(userIds) {
  return new Promise(function (resolve) {
    let ret = users.filter(function (user) {
      return userIds.includes(user.id);
    });
    setTimeout(function () {
      resolve(userIds);
    }, 1000);
  });
}

getComments()
  .then((ret) => {
    let userIds = ret.map(function (comment) {
      return comment.userId;
    });
    // console.log(userIds);
    return getUsersByIds(userIds).then((ret) => {
      return {
        users: users,
        comments: comments,
      };
    });
  })
  .then((ret) => {
    console.log(ret);
  })
  .catch((err) => {});
