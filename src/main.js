import { Calendar } from "./calendar.js";
import { ToDo } from "./todo.js";

const today = new Date();
const calendar = new Calendar(today);

const todo = new ToDo(today, calendar);
const list = document.querySelector(".todo__list");
const dashBoard = document.querySelector(".dash-board-menu__list");
calendar.showCalendar(today);
todo.setDate(today);

dashBoard.addEventListener("click", (e) => {
  let target = e.target.closest("li");
  if (!target) return;
  switch (target.dataset.btnType) {
    case "delete-mod":
      deleteMod(target);
  }
});

function deleteMod(target) {
  if (target.matches(".active")) {
    list.classList.remove("delete-mod");
    target.classList.remove("active");
  } else {
    list.classList.add("delete-mod");
    target.classList.add("active");
  }
}
