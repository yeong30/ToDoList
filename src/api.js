import app from "./firebase.js";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const db = getFirestore(app);
async function getTodoList(docName = "2022-01-01") {
  console.log("call docName > ", docName);
  const todoRef = collection(db, "todo", docName, "items");
  const todoSnapshot = await getDocs(todoRef);
  const todoList = todoSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // const todoList = todoSnapshot.exists() ? todoSnapshot.data() : [];

  return todoList;
}

async function insertTodoList(docName, content) {
  console.log(docName, content);
  const todoRef = collection(db, "todo", docName, "items");
  await addDoc(
    todoRef,
    { ...content, timestamp: serverTimestamp() },
    { merge: true }
  );
}

async function updateTodoItem(docName, itemId, content) {
  const todoRef = doc(db, "todo", docName, "items", itemId);
  await updateDoc(todoRef, { ...content, timestamp: serverTimestamp() });
}

export { getTodoList, insertTodoList, updateTodoItem };
