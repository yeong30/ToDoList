import { Calendar } from "./calendar.js";
import { Note } from "./note.js";
import { DashBoardBuilder } from "./dashBoard.js";
const today = new Date();
const calendar = new Calendar();
const note = new Note();

const todoDashBoard = new DashBoardBuilder()
  .setDate(today)
  .setCalendar(calendar)
  .setNote(note)
  .build();
todoDashBoard.show();
const list = document.querySelector(".todo__list");
