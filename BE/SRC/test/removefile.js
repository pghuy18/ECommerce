const removeFile = () => {
  const path1 = path.join(__dirname, "/public/test/text.txt");
  try {
    fs.unlinkSync(path1);
    console.log("file removed");
    //file removed
  } catch (err) {
    console.error(err);
  }
};

removeFile();
