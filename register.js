const authentication = firebase.auth();
let objectURL;
let uploadedFile;
document.getElementById("submit").addEventListener("click", async () => {
    console.log("Submitted!")
    console.log("Name: ", document.formContent.Name.value);
    const ref = firebase.storage().ref("/Images/" + document.formContent.Name.value);
    let uploadTask = ref.put(uploadedFile);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        async () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                console.log("File available at", await downloadURL);

            })
        })
})

document
  .querySelector("#Photo")
  .addEventListener("change", function () {
    uploadedFile = document.getElementById("Photo").files[0];
    objectURL = URL.createObjectURL(
      document.getElementById("Photo").files[0]
    );
    console.log(objectURL);
  });