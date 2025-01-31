const CHECKED = "checked";
const ACTIVE = "active";
const DELETE_MOD = "delete-mod";
const ACTIVE_MOD = "active-mod";

import { getList, insertList, deleteItem, updateItem } from "./api.js";
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
    this.mod = ACTIVE_MOD;
    this.item_count = 0;
    this.loading = document.querySelector(".loading");
    this.doubleclickResource = null;
  }
  showTodo = async (date) => {
    this.chaneLoadingStatus(true);
    this.activeDate = date;
    let todoList = await getList(DateToHashFormat(date));
    this.item_count = todoList.length;
    this.drawTodoList(todoList, date);
    this.chaneLoadingStatus(false);
  };

  drawTodoList(todoList, date) {
    this.todo__header.textContent = DateToHashFormat(date);
    this.todo__list.innerHTML = "";
    this.itemValidCheck();
    for (let todoItem of todoList) {
      const li = this.toDoHTML(todoItem);
      this.todo__list.append(li);
    }
  }
  toDoHTML(todo) {
    const li = document.createElement("li");
    const status = todo.checked ? CHECKED : ACTIVE;

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
    this.chaneLoadingStatus(true);
    if (this.doubleclickResource) return;
    this.doubleclickResource = this.activeDate;
    await insertList(DateToHashFormat(this.activeDate), {
      content: value,
      checked: false,
    });
    this.todo__input.value = "";
    await this.showTodo(this.activeDate);
    this.doubleclickResource = null;
  };

  selectTodoItem = async (e) => {
    if (this.doubleResource || !e.target.dataset.id) return;
    this.doubleclickResource = e.target.dataset.id;

    this.chaneLoadingStatus(true);
    await new Promise((resolve, rej) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    let target = e.target;
    if (target.nodeName === "I") {
      target = target.closest("li");
    }
    if (!target) return;
    if (this.mod === DELETE_MOD) {
      await this.deleteTodoItem(DateToHashFormat(this.activeDate), target);
    } else {
      await this.checkTodoItem(DateToHashFormat(this.activeDate), target);
    }
    this.doubleclickResource = "";
    this.chaneLoadingStatus(false);
  };
  async deleteTodoItem(hash, todoItem) {
    const deletedId = await deleteItem(hash, todoItem.dataset.id);

    if (todoItem.dataset.id === deletedId) {
      todoItem.remove();
      this.item_count--;
      this.itemValidCheck();
    }
  }
  async checkTodoItem(hash, todoItem) {
    if (todoItem?.dataset.status === ACTIVE) {
      await updateItem(hash, todoItem.dataset.id, {
        checked: true,
      }).then(() => {
        todoItem.dataset.status = CHECKED;
      });
    } else {
      await updateItem(hash, todoItem.dataset.id, {
        checked: false,
      }).then(() => {
        todoItem.dataset.status = ACTIVE;
      });
    }
  }
  changeMod(e) {
    const target = e.currentTarget;
    if (target.matches("." + ACTIVE_MOD)) {
      this.mod = ACTIVE_MOD;
      this.todo__list.classList.remove(DELETE_MOD);
      target.classList.remove(ACTIVE_MOD);
    } else {
      this.mod = DELETE_MOD;
      this.todo__list.classList.add(DELETE_MOD);
      target.classList.add(ACTIVE_MOD);
    }
  }
  itemValidCheck() {
    if (this.item_count === 0) this.todo__list.innerHTML = "데이터가 없습니다.";
  }
  chaneLoadingStatus(flag) {
    if (flag) {
      this.loading.classList.add("active");
      return;
    } else this.loading.classList.remove("active");
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
