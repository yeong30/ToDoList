import { getTodoList, insertTodoList, updateTodoItem } from "./api.js";
class ToDo {
  constructor(date) {
    this.todo__header = document.querySelector(".todo__date");
    this.todo__list = document.querySelector(".todo__list");
    this.todo__form = document.querySelector(".todo__form");
    this.todo__input = document.querySelector(".todo__input");
    this.deleteModBtn = document.querySelector(".btn__delete-mod");
    this.activeDate = date;
    this.todo__list.addEventListener("click", this.selectTodoItem);
    this.todo__form.addEventListener("submit", this.addTodoItem);
    this.deleteModBtn.addEventListener("click", (e) => this.changeMod(e));
    this.mod = "active";
  }
  showTodo = async (date) => {
    this.activeDate = date;
    let todoList = await getTodoList(DateToHashFormat(date));
    this.drawTodoList(todoList, date);
  };

  drawTodoList(todoList, date) {
    this.todo__header.textContent = DateToHashFormat(date);
    this.todo__list.innerHTML = "";
    if (!todoList.length) {
      this.todo__list.innerHTML = "데이터가 없습니다.";
    } else {
      for (let todoItem of todoList) {
        const li = this.toDoHTML(todoItem);
        this.todo__list.append(li);
      }
    }
  }
  toDoHTML(todo) {
    const li = document.createElement("li");
    const status = todo.deleted
      ? "deleted"
      : todo.checked
      ? "checked"
      : "active";

    li.setAttribute("class", "todo__item");
    li.setAttribute("data-id", todo.id);
    li.setAttribute("data-status", status);

    let leftBtn = ` <button class="item__delete-btn" data-btn-type="delete">
      <i class="fa-solid fa-circle-minus"  data-id="${todo.id}"></i>
    </button>`;
    let rightBtn = `
    <button class="item__check-btn" data-btn-type="check">
      <i class="fa-solid fa-circle-check" data-id="${todo.id}"></i>
    </button>`;
    li.textContent = todo.content;
    li.insertAdjacentHTML("afterbegin", leftBtn);
    li.insertAdjacentHTML("beforeend", rightBtn);
    return li;
  }

  addTodoItem = async (e) => {
    e.preventDefault();
    let value = this.todo__input.value;
    if (!value) return alert("내용을 입력하세요!");
    await insertTodoList(DateToHashFormat(this.activeDate), {
      content: value,
      checked: false,
      deleted: false,
    });
    this.todo__input.value = "";
    this.todo__input.focus();
    await this.showTodo(this.activeDate);
  };

  selectTodoItem = (e) => {
    let target = e.target;
    if (target.nodeName === "I") {
      target = target.closest("li");
    }
    if (!target) return;
    if (this.mod === "delete") {
      this.deleteTodoItem(DateToHashFormat(this.activeDate), target);
    } else {
      this.checkTodoItem(DateToHashFormat(this.activeDate), target);
    }
  };
  deleteTodoItem(hash, todoItem) {
    updateTodoItem(hash, todoItem.dataset.id, { deleted: true }).then(() => {
      todoItem.dataset.status = "deleted";
    });
  }
  checkTodoItem(hash, todoItem) {
    console.log(todoItem);
    if (todoItem?.dataset.status === "active") {
      updateTodoItem(hash, todoItem.dataset.id, {
        checked: true,
      }).then(() => {
        todoItem.dataset.status = "checked";
      });
    } else {
      updateTodoItem(hash, todoItem.dataset.id, {
        checked: false,
      }).then(() => {
        todoItem.dataset.status = "active";
      });
    }
  }
  changeMod(e) {
    const target = e.currentTarget;
    console.log(target);
    if (target.matches(".active")) {
      this.mod = "delete";
      this.todo__list.classList.remove("delete-mod");
      target.classList.remove("active");
    } else {
      this.mod = "active";
      this.todo__list.classList.add("delete-mod");
      target.classList.add("active");
    }
    // this.deleteModBtn.classList.toggle("active");
  }
}

function DateToHashFormat(date) {
  let day =
    date.getDate() < 10 ? "0" + String(date.getDate()) : String(date.getDate());
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + String(date.getMonth() + 1)
      : String(date.getMonth() + 1);
  return year + "-" + month + "-" + day;
}

export { ToDo };
