import { ToDo } from "./todo.js";

class DashBoardBuilder {
  constructor() {}
  setDate(date) {
    this.date = date;
    return this;
  }
  setCalendar(calendar) {
    this.calendar = calendar;
    return this;
  }
  setNote(note) {
    this.note = note;
    return this;
  }
  build() {
    return new DashBoard(this.date, this.calendar, this.note);
  }
}

class DashBoard {
  constructor(date, calendar, note) {
    this.activeDate = date;
    // this.dashBoard = document.querySelector(".dash-board-menu__list");
    this.todoList = new ToDo(date, calendar);
    this.calendar = calendar;
    this.note = note;
    this.navToggleBtn = document.querySelector(".nav__toggle-btn");
    this.navMenu = document.querySelector(".dash-board-menu__list");
    this.note__container = document.querySelector(".note__container");
    this.calendar__container = document.querySelector(".calendar__container");

    this.activeMen;
    this.deleteModBtn = document.querySelector(".btn__delete-mod");
    this.navToggleBtn.addEventListener("click", () => this.toggleMenu());
    this.navMenu.addEventListener("click", (e) => this.clickMenuBtns(e));
  }
  show() {
    this.linkComponents();
    this.calendar.showCalendar(this.activeDate);
    this.todoList.showTodo(this.activeDate);
    console.log(this.todoList);
  }
  linkComponents() {
    this.calendar.clickDateEventListener(this.todoList.showTodo);
  }
  clickMenuBtns(e) {
    this.size = window.outerWidth;
    if (this.size <= 768) {
      alert("PC버전에서 이용가능한 기능입니다.");
      return;
    }
    let target = e.target.closest("li");
    console.log(target.dataset.btnType);
    if (!target) return;
    // if (!this.activeMen) return;
    switch (target.dataset.btnType) {
      case "calendar": {
        this.changeToCalendar();
        return;
      }
      case "note": {
        this.changeToNote();
        return;
      }
      case "today": {
        this.resetToToday();
      }
    }
  }
  changeToCalendar() {
    this.note__container.style.display = "none";
    this.calendar__container.style.display = "block";
  }
  changeToNote() {
    this.note.show();
    this.calendar__container.style.display = "none";
    this.note__container.style.display = "block";
  }
  resetToToday() {
    this.activeDate = new Date();
    this.show();
  }
  toggleMenu() {
    this.navMenu.classList.toggle("nav--show");
  }
}

export { DashBoardBuilder };
