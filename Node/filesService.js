// requires...

// constants...

function createFile (req, res, next) {
  // code to create the file.

  res.status(200).send({ "message": "File created successfully" });
}

function getFiles (req, res, next) {
  // code to get all files.

  res.status(200).send({
    "message": "Success",
    "files": ["notes.txt"] });
}

const getFile = (req, res, next) => {
  // code to get all files.

  res.status(200).send({
    "message": "Success",
    "filename": "notes.txt",
    "content": "1. Create GitLab project. 2. Push the homework. 3. Upload homework details to the Excel file",
    "extension": "txt",
    "uploadedDate": "2022-07-22T17:05:25Z"});
}

// Other functions - editFile, deleteFile

// path.extName('file.txt') ---> '.txt'
// fs.writeFile ({ flag: 'a' }) ---> adds content to the file

module.exports = {
  createFile,
  getFiles,
  getFile
}
