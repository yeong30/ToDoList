class Calendar {
  constructor(date) {
    this.calendar = document.querySelector(".calendar");
    this.selectedDate;
    this.currentDate = date;
    this.calendar.addEventListener("click", (e) => {
      let target = e.target.closest("td");
      if (!target) return;

      this.currentDate.setDate(target.dataset.date);

      this.selectedDate.classList.remove("selected");
      this.dateClickEvent && this.dateClickEvent(this.currentDate);
      console.log(this.currentDate.getFullYear());
      target.classList.add("selected");
      this.selectedDate = target;
    });
  }
  drawCalendar(year, month) {
    let today = new Date().getDate();
    console.log("month : ", month);
    const day = new Date(year, month - 1, 1);
    let calHtml =
      "<tr><th>Mon</th><th>tue</th><th>wed</th><th>thu</th><th>fri</th><th>Sat</th><th>Sun</th></tr><tr>";

    for (let i = 1; i < getDay(day); i++) {
      calHtml += "<td></td>";
    }
    while (day.getMonth() === month - 1) {
      if (day.getDate() === today)
        calHtml +=
          "<td class='selected' data-date ='" +
          day.getDate() +
          " '><span>" +
          day.getDate() +
          "</span></td>";
      else
        calHtml +=
          "<td data-date ='" +
          day.getDate() +
          " '><span>" +
          day.getDate() +
          "</span></td>";

      if (getDay(day) === 7) calHtml += "</tr><tr>";
      day.setDate(day.getDate() + 1);
    }
    if (getDay(day) !== 1)
      for (let i = getDay(day); i <= 7; i++) {
        calHtml += "<td></td>";
      }
    this.calendar.innerHTML = calHtml;
    this.selectedDate = document.querySelector(".selected");
  }
  dateClickListener(f) {
    this.dateClickEvent = f;
  }
}
function getDay(d) {
  if (d.getDay() === 0) return 7;
  else return d.getDay();
}

export { Calendar };
