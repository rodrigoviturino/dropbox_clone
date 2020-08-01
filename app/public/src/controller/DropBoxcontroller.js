class DropBoxController {
  constructor() {
    this.btnSendFileEl = document.querySelector("#btn-send-file");
    this.inputFilesEl = document.querySelector("#files");
    this.snackModalEl = document.querySelector("#react-snackbar-root");
    this.initEvents();
  }

  initEvents() {
    this.btnSendFileEl.addEventListener("click", () => {
      this.inputFilesEl.click();
    });
    this.inputFilesEl.addEventListener("change", (event) => {
      this.snackModalEl.style.display = "block";
      this.uploadTask(event.target.files);
    });
  }

  uploadTask(files) {
    let promises = [];
    let options = {
      method: "POST",
    };

    [...files].forEach((file) => {
      fetch("./upload", options)
        .then((body) => {
          promises.push(body.text());
        })
        .then((response) => {
          promises.push(response);

          let formData = new FormData();
          formData.append("input-file", file);

          return formData;
        })
        .catch((erro) => {
          console.log("Está osso fiote.", erro);
        });
    });
    console.log(promises);
    return Promise.all(promises);
  }
}
