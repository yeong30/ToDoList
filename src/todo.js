import uuidv4 from "./uuid.js";
import { getTodoList, insertTodoList, updateTodoItem } from "./api.js";
class ToDo {
  constructor(date, calendar) {
    this.todo__header = document.querySelector(".todo__date");
    this.todo__list = document.querySelector(".todo__list");
    this.todo__form = document.querySelector(".todo__form");
    this.input = document.querySelector(".todo__input");
    this.date = date;
    this.todo__list.addEventListener("click", this.clickItem);
    this.todo__form.addEventListener("submit", this.addItem);
    this.todoItems;
    calendar.dateClickListener(this.setDate);
  }
  setDate = (date) => {
    this.hash_date = getHash(...DateToStringFormat(date));
    this.getTodoMeta().then(() => {
      this.todo__header.textContent = this.hash_date;
      this.setTodoList();
    });
  };

  async getTodoMeta() {
    this.todoItems = await getTodoList(this.hash_date);
  }
  setTodoList() {
    this.todo__list.innerHTML = "";
    if (!this.todoItems.length) {
      this.todo__list.innerHTML = "데이터가 없습니다.";
    } else {
      for (let item of this.todoItems) {
        const li = document.createElement("li");
        const status = item.deleted
          ? "deleted"
          : item.checked
          ? "checked"
          : "active";

        li.setAttribute("class", "todo__item");
        li.setAttribute("data-id", item.id);
        li.setAttribute("data-status", status);

        let leftBtn = ` <button class="item__delete-btn" data-btn-type="delete">
          <i class="fa-solid fa-circle-minus"  data-id="${item.id}"></i>
        </button>`;
        let rightBtn = `
        <button class="item__check-btn" data-btn-type="check">
          <i class="fa-solid fa-circle-check" data-id="${item.id}"></i>
        </button>`;
        console.log(li);
        li.textContent = item.content;

        li.insertAdjacentHTML("afterbegin", leftBtn);
        li.insertAdjacentHTML("beforeend", rightBtn);
        this.todo__list.append(li);
      }
    }
  }
  addItem = (e) => {
    e.preventDefault();
    const uuid = uuidv4();

    let value = this.input.value;
    if (!value) return alert("내용을 입력하세요!");
    const li = this.rowItem(value, uuid);
    this.todo__list.append(li);
    this.input.value = "";
    this.input.focus();
    insertTodoList(this.hash_date, uuid, {
      content: value,
      checked: false,
      deleted: false,
    });
  };
  rowItem(value, uuid) {
    let li = document.createElement("li");

    li.setAttribute("class", "todo__item");
    li.setAttribute("data-id", uuid);
    li.setAttribute("data-status", "active");

    let leftBtn = ` <button class="item__delete-btn" data-btn-type="deleted">
    <i class="fa-solid fa-circle-minus"  data-id="${item.id}"></i>
  </button>`;
    let rightBtn = `
  <button class="item__check-btn" data-btn-type="check">
    <i class="fa-solid fa-circle-check" data-id="${item.id}"></i>
  </button>`;
    console.log(li);
    li.textContent = item.content;

    li.insertAdjacentHTML("afterbegin", leftBtn);
    li.insertAdjacentHTML("beforeend", rightBtn);
    return li;
  }

  clickItem = (e) => {
    if (e.target.nodeName !== "I") return;
    const uuid = e.target.dataset.id;
    const targetBtn = e.target.closest("button"); //클릭된버튼
    const targetLi = document.querySelector(`.todo__item[data-id="${uuid}"]`);
    if (!targetBtn || !targetLi) return;
    const targetBtnType = targetBtn?.dataset.btnType; //버튼의 data-btn-type 속성으로 delete,check구분
    if (targetBtnType === "delete") {
      this.deleteTodoItem(targetLi);
    } else {
      this.checkTodoItem(targetLi);
    }
  };
  deleteTodoItem(todoItem) {
    updateTodoItem(this.hash_date, todoItem.dataset.id, { deleted: true }).then(
      () => {
        todoItem.dataset.status = "deleted";
      }
    );
  }
  checkTodoItem(todoItem) {
    if (todoItem?.dataset.status === "active") {
      updateTodoItem(this.hash_date, todoItem.dataset.id, {
        checked: true,
      }).then(() => {
        todoItem.dataset.status = "checked";
      });
    } else {
      updateTodoItem(this.hash_date, todoItem.dataset.id, {
        checked: false,
      }).then(() => {
        console.log("checked success?");
        todoItem.dataset.status = "active";
      });
    }
  }
}
function getHash(...data) {
  let hash = data.join("-");
  return hash;
}
function DateToStringFormat(date) {
  let day =
    date.getDate() < 10 ? "0" + String(date.getDate()) : String(date.getDate());
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + String(date.getMonth() + 1)
      : String(date.getMonth() + 1);
  return [year, month, day];
}

// let templist = {
//   //   "2021-05": {
//   21: [
//     { content: "책읽기", checked: true, delete: false, uuid: "test" },
//     { content: "책읽기", checked: true, delete: true, uuid: "test2" },
//     { content: "책읽기", checked: true, delete: false, uuid: "test3" },
//   ],
//   22: [
//     { content: "낙서읽기", checked: true, delete: false, uuid: "test4" },
//     { content: "111읽기", checked: true, delete: false, uuid: "test5" },
//     { content: "2342342읽기", checked: true, delete: false, uuid: "test7" },
//   ],
//   //   },
// };
export { ToDo };
