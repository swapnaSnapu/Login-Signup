
// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, storage } from "@/app/lib/firebase";

// const TaskManager = () => {
//   const [tasks, setTasks] = useState([]);
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [priority, setPriority] = useState("low");
//   const [price, setPrice] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // ✅ This useEffect listens for real-time updates to tasks
//   useEffect(() => {
//     const q = query(
//       collection(db, "tasks"),
//       where("priority", "in", ["low", "medium", "high"]),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const updatedTasks = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setTasks(updatedTasks);
//     });

//     return () => unsubscribe();
//   }, []);

//   // ✅ Uploads file and adds task to Firestore
//   const handleUpload = async () => {
//     if (!file || !title || !price || !priority) {
//       setError("All fields are required!");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const storageRef = ref(storage, `images/${file.name}`);
//       await uploadBytes(storageRef, file);
//       const imageUrl = await getDownloadURL(storageRef);

//       await addDoc(collection(db, "tasks"), {
//         title,
//         price: Number(price),
//         priority,
//         imageUrl,
//         createdAt: serverTimestamp(),
//       });

//       setTitle("");
//       setPrice("");
//       setFile(null);
//       setPriority("low");
//       setSuccess("Task uploaded successfully!");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError("Failed to upload task. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "2rem",
//         fontFamily: "Arial, sans-serif",
//         maxWidth: "600px",
//         margin: "0 auto",
//       }}
//     >
//       <h2>Create Task</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//           marginBottom: "20px",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{ padding: "8px", fontSize: "16px" }}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           style={{ padding: "8px", fontSize: "16px" }}
//         />
//         <select
//           onChange={(e) => setPriority(e.target.value)}
//           value={priority}
//           style={{ padding: "8px", fontSize: "16px" }}
//         >
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           style={{ padding: "8px", fontSize: "16px" }}
//         />
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           style={{
//             backgroundColor: loading ? "#ccc" : "#0070f3",
//             color: "white",
//             border: "none",
//             padding: "10px",
//             fontSize: "16px",
//             cursor: "pointer",
//           }}
//         >
//           {loading ? "Uploading..." : "Upload Task"}
//         </button>
//       </div>

//       <h3>Task List</h3>
//       {tasks.length === 0 && <p>No tasks yet.</p>}

//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           style={{
//             marginTop: "20px",
//             padding: "15px",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//           }}
//         >
//           <h4>{task.title}</h4>
//           <p>
//             <strong>Price:</strong> ${task.price}
//           </p>
//           <p>
//             <strong>Priority:</strong> {task.priority}
//           </p>
//           {task.imageUrl && (
//             <img
//               src={task.imageUrl}
//               alt="Task"
//               style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskManager;


'use client';
import { useState } from 'react';
import { db } from '../../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function TaskForm() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'tasks'), {
      task,
      priority,
      price: parseFloat(price),
      imageUrl,
      createdAt: serverTimestamp(),
    });

    setTask('');
    setPriority('Low');
    setPrice('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto">
      <input
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="url"
        placeholder="Paste image URL (e.g., https://...)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}