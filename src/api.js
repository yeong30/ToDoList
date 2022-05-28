import app from "./firebase.js";
import {
  getFirestore,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const db = getFirestore(app);
async function getList(docName = "2022-01-01") {
  const todoRef = collection(db, "todo", docName, "items");
  const todoSnapshot = await getDocs(todoRef);
  const todoList = todoSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return todoList;
}

async function insertList(docName, content) {
  const todoRef = collection(db, "todo", docName, "items");
  await addDoc(
    todoRef,
    { ...content, timestamp: serverTimestamp() },
    { merge: true }
  );
}

async function updateItem(docName, itemId, content) {
  const todoRef = doc(db, "todo", docName, "items", itemId);
  await updateDoc(todoRef, { ...content, timestamp: serverTimestamp() });
}

async function deleteItem(docName, itemId) {
  const todoRef = doc(db, "todo", docName, "items", itemId);
  await deleteDoc(todoRef);
}

export { getList, insertList, deleteItem, updateItem };
