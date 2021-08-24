// const phoneNumber = "123-123-1234";

// function removeHyphens(s) {
//   return s.replace(/-/g, "");
// }
// console.log(removeHyphens(phoneNumber));

const phoneNumbers = ["097.123.1234", "091-303-0001", "0123 123 324"];
function santitize(s) {
  return phoneNumbers.map((str) => {
    return str.replace(/[. -]/g, "");
  });
}
console.log(
  `"name" with value "213" fails to match the required pattern: /^(\w+( ?\w)+)(, ?)?(\w+( ?\w)+)$/`.indexOf(
    "subname"
  )
);
let regex = /^\w$/g;
let s = "hehe";
console.log(regex.test(s));
// console.log(santitize(phoneNumbers));
