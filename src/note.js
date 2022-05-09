class Note {
  constructor() {
    this.note__content = document.querySelector(".note__content");
    this.btn = document.querySelector(".note-btn");
    this.btn.addEventListener("click", this.save);
  }
  save = () => {
    const value = this.note__content.value;
    localStorage.setItem("note", value);
  };
  show() {
    const value = localStorage.getItem("note");
    this.note__content.value = value;
  }
}

export { Note };
