const WEEKS = ["Mon", "tue", "wed", "thu", "fri", "sat", "sun"];

class Calendar {
  constructor() {
    this.calendar = document.querySelector(".calendar__body");
    this.calendar__month = document.querySelector(".calendar__month");
    this.calendarBtns = document.querySelectorAll(".calendar__btn");
    this.calendarBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.changeMonth(e));
    });
    this.calendar.addEventListener("click", (e) => this.changeDate(e));
  }
  showCalendar(date) {
    this.date = { active: date, display: date };
    this.drawCalendar(date);
    this.selecteDateItem = document.querySelector(".selected");
  }
  drawCalendar(date) {
    const { firstDateOfMonth, today } = this.processDate(date);
    this.calendar.innerHTML = this.calendarHTML(firstDateOfMonth, today);
    this.calendar__month.textContent = dateToHashFormat(date);
  }
  changeDate(e) {
    let target = e.target.closest("td");
    if (!target) return;
    this.date.active = new Date(
      this.date.display.getFullYear(),
      this.date.display.getMonth(),
      target.dataset.date
    );
    this.selecteDateItem.classList.remove("selected");
    console.log(this.dateClickEvent);
    this.dateClickEvent && this.dateClickEvent(this.date.active);
    target.classList.add("selected");
    this.selecteDateItem = target;
  }

  changeMonth(e) {
    let displayDate;
    let target = e.currentTarget;
    let month = this.date.display.getMonth();
    let year = this.date.display.getFullYear();
    let date = 1;
    if (target.matches(".btn--right")) {
      displayDate = new Date(year, month + 1, date);
      this.drawCalendar(displayDate);
    } else {
      displayDate = new Date(year, month - 1, date);
      this.drawCalendar(displayDate);
    }
    this.date.display = displayDate;
  }
  processDate(date) {
    let today = new Date().getDate();
    const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return { firstDateOfMonth, today };
  }

  calendarHTML(day) {
    let month = day.getMonth();
    let calendarHtml = "<tr>";
    for (let i = 0; i < WEEKS.length; i++) {
      calendarHtml += "<th>" + WEEKS[i] + "</th>";
    }
    calendarHtml += "<tr>";
    for (let i = 1; i < getDay(day); i++) {
      calendarHtml += "<td></td>";
    }
    while (day.getMonth() === month) {
      if (
        day.getDate() === this.date.active.getDate() &&
        day.getMonth() === this.date.active.getMonth()
      )
        calendarHtml +=
          "<td class='selected' data-date ='" +
          day.getDate() +
          " '><span>" +
          day.getDate() +
          "</span></td>";
      else
        calendarHtml +=
          "<td data-date ='" +
          day.getDate() +
          " '><span>" +
          day.getDate() +
          "</span></td>";

      if (getDay(day) === 7) calendarHtml += "</tr><tr>";
      day.setDate(day.getDate() + 1);
    }
    if (getDay(day) !== 1)
      for (let i = getDay(day); i <= 7; i++) {
        calendarHtml += "<td></td>";
      }
    return calendarHtml;
  }
  clickDateEventListener(f) {
    this.dateClickEvent = f;
  }
}
function getDay(d) {
  if (d.getDay() === 0) return 7;
  else return d.getDay();
}
function dateToHashFormat(date) {
  let month = date.getMonth() + 1;
  let format = date.getFullYear() + " - " + (month < 10 ? "0" + month : month);
  return format;
}

export { Calendar };
