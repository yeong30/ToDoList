import { Calendar } from "./calendar.js";
import { DashBoardBuilder } from "./dashBoard.js";
const today = new Date();
const calendar = new Calendar();
const todoDashBoard = new DashBoardBuilder()
  .setDate(today)
  .setCalendar(calendar)
  .build();
todoDashBoard.show();
const list = document.querySelector(".todo__list");
