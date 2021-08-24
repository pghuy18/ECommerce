function condition() {
  let a = [
    true,
    false,
    0,
    1,
    2,
    null,
    undefined,
    { name: "ABC ", age: 15 },
    "",
    "stringGGG",
    ["string1", "string2"],
  ];
  for (var i in a) {
    if (a[i]) {
      console.log("condition", a[i], typeof a[i]);
    }
  }
}
