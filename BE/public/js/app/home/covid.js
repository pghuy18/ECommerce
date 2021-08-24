// const app = new AppApi();
var DOM = {
  total: 0,
  recover: 0,
  dead: 0,
};
let prepareData = function () {
  var cityList = [];

  if (location.protocol == "https:") {
    location.protocol = "http:";
  }
  // if (window.performance) {
  //   console.info("window.performance works fine on this browser");
  // }
  // console.info(performance.navigation.type);
  // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //   console.info("This page is reloaded");
  // } else {
  //   console.info("This page is not reloaded");
  // }

  // if ((document.location.protocol = "https")) {
  //   document.location.protocol = "http";
  // }
  //   if (href.indexOf("https") != -1) {
  //     href.replace("https", "http");
  //     document.location.href = href;
  //   }
  axios
    .get("http://168.63.133.155/api/Covid/GetCityList")
    .then((res) => {
      var promiseList = [];
      cityList = res.data;
      res.data.forEach((city) => {
        promiseList.push(
          axios.get(`http://168.63.133.155/api/Covid/GetStats?code=${city.code}`)
        );
      });
      return Promise.all(promiseList);
    })
    .then((cityStatsList) => {
      // var a = {};
      cityStatsList = cityStatsList.map((o) => o.data);
      console.log(cityStatsList[0]);
      cityStatsList.forEach((cityStats) => {
        let clone = Object.assign({}, cityStats);
        delete clone.cityCode;
        cityList[cityStats.cityCode - 1].stats = clone;
        DOM.total += clone.total;
        DOM.recover += clone.recover;
        DOM.dead += clone.dead;
      });
      return cityList;
    })
    .then((list) => {
      let text = prepareTable(list);
      let sheet = document.getElementById("sheet");
      document.getElementById("totalNum").innerText = DOM.total;
      document.getElementById("deadNum").innerText = DOM.dead;
      document.getElementById("recoverNum").innerText = DOM.recover;
      sheet.insertAdjacentHTML("afterbegin", text);
    })
    .catch((err) => {
      console.log(err);
    });
  return cityList;
};

let prepareTable = function (listCity) {
  let arr = [];
  listCity.forEach((elm) => {
    arr.push(`<tr>`);
    arr.push(`<th scope="row">${elm.name}</th>`);
    arr.push(`<td>${elm.stats.total}</td>`);
    arr.push(`<td>${elm.stats.active}</td>`);
    arr.push(`<td>${elm.stats.dead}</td>`);
    arr.push(`<td>${elm.stats.recover}</td>`);
    arr.push(`</tr>`);
  });
  return arr.join("");
};

$(document).ready(async function () {
  // alert("asd");
  var sheet = document.getElementById("sheet");

  prepareData();
  // console.log(t);
});
