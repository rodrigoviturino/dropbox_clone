class DropBoxController {
  constructor() {
    this.btnSendFileEl = document.querySelector("#btn-send-file");
    this.inputFilesEl = document.querySelector("#files");
    this.snackModalEl = document.querySelector("#react-snackbar-root");
    this.progressBarEl = document.querySelector(".mc-progress-bar-fg");
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

  // Promise
  uploadTask(files) {
    let promises = [];

    [...files].forEach((file) => {
      let respostaPromise = new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest();
        ajax.open("POST", "./upload");
        ajax.onload = (event) => {
          try {
            resolve(JSON.parse(ajax.responseText));
          } catch (e) {
            reject(e);
          }
        };

        ajax.onerror = (event) => {
          reject(event);
        };

        ajax.upload.onprogress = (event) => {
          this.uploadProgress(event, file);
          console.log(event);
        };

        let formData = new FormData();
        formData.append("input-file", file);
        ajax.send(formData);
      });
      promises.push(respostaPromise);
    });

    return Promise.all(promises);
  }

  // Progresso do arquivo
  uploadProgress(event, file) {
    let loaded = event.loaded;
    let total = event.total;
    let porcent = parseInt((loaded / total) * 100);

    this.progressBarEl.style.width = `${porcent}%`;
    console.log(this.progressBarEl);
  }
}
