// // 'use client';

// // import { useState } from 'react';
// // import { db } from '../../lib/firebase.js';
// // import { collection, addDoc, Timestamp } from 'firebase/firestore';
// // import { useRouter } from 'next/navigation';

// // export default function CreateTodo() {
// //   const [task, setTask] = useState('');
// //   const router = useRouter();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!task) return;

// //     await addDoc(collection(db, 'todos'), {
// //       task,
// //       createdAt: Timestamp.now(),
// //     });

// //     setTask('');
// //     router.push('/todos'); // navigate to list
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-8">
// //       <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
// //         <h1 className="text-2xl font-bold mb-4">Create To-Do</h1>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <input
// //             type="text"
// //             className="w-full border p-2 rounded"
// //             placeholder="Enter task"
// //             value={task}
// //             onChange={(e) => setTask(e.target.value)}
// //           />
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
// //           >
// //             Add Task
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }



// 'use client'
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../lib/firebase';




// export default function ToDoPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         router.push('/login');
//       } else {
//         setUser(user);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [router]);

//   if (loading) return <p>Loading...</p>;
//   if (!user) return null;

//   return (
//     <div>
//       <h1>ToDo Page - Protected</h1>
//       <p>Welcome, {user.email}</p>
//     </div>
//   );
// }


'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase';
import {
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default function ToDoPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/Admin/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // ✅ Load Todos
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'todos'),
      where('userId', '==', user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [user]);

  // ✅ Add Todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await addDoc(collection(db, 'todos'), {
      text: newTodo,
      userId: user.uid,
      createdAt: new Date()
    });
    setNewTodo('');
  };

  // ✅ Delete Todo
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  // ✅ Logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/Admin/login');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">ToDo List</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleAddTodo} className="flex gap-2">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No todos yet.</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <span>{todo.text}</span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
