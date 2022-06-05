const DOMAIN = "https://yeong-todos.herokuapp.com/todos/";
async function getList(register_date = "2021-01-01") {
  let todos = [];
  try {
    let result = await fetch(
      DOMAIN + "getTodos?register_date=" + register_date
    );
    let data = await result.json();

    if (data && data !== {}) {
      for (let key in data.body) {
        todos.push({ ...data.body[key], id: key });
      }
    }
  } catch (error) {
    alert(error);
  }
  return todos;
}

async function insertList(register_date, requsetTodo) {
  let result = await fetch(DOMAIN + "addTodo", {
    method: "POST",

    body: JSON.stringify({
      content: requsetTodo.content,
      checked: requsetTodo.checked,
      register_date: register_date,
    }),
    headers: { "Content-Type": "application/json" },
  });
}

async function updateItem(docName, itemId, content) {
  let result = await fetch(DOMAIN + "update/checked", {
    method: "POST",
    body: JSON.stringify({
      id: itemId,
      register_date: register_date,
      checked: content.checked,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(result);
  return result;
}

async function deleteItem(register_date, itemId) {
  let result = await fetch(DOMAIN + "deleteTodo", {
    method: "DELETE",
    body: JSON.stringify({
      id: itemId,
      register_date: register_date,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return result;
}

export { getList, insertList, deleteItem, updateItem };
