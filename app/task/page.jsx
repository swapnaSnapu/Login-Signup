

// 'use client';

// import { useEffect, useState } from 'react';
// import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
// import { db } from '../lib/firebase';
// import TaskCard from '../task/components/TaskCard';
// import TaskForm from './components/TaskForm';

// export default function TaskPage() {
//   const [tasks, setTasks] = useState([]);
//   const [priorityFilter, setPriorityFilter] = useState('');
//   const [priceSort, setPriceSort] = useState('');
//   const [loading, setLoading] = useState(true);

//   // 🔁 Live sync Firestore tasks
//   useEffect(() => {
//     const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
//     const unsub = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setTasks(data);
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   // 🎯 Apply filter and sorting
//   const filteredTasks = tasks
//     .filter((task) => (priorityFilter ? task.priority === priorityFilter : true))
//     .sort((a, b) => {
//       if (priceSort === 'asc') return a.price - b.price;
//       if (priceSort === 'desc') return b.price - a.price;
//       return 0;
//     });

//   // 📸 Tasks that include an image
//   const imageTasks = tasks.filter((task) => !!task.imageUrl);

//   return (
//     <div className="p-6 space-y-6">
//       {/* 🔧 Filters and Task Form */}
//       <header className="flex flex-wrap gap-4 items-start justify-between">
//         <div className="flex gap-4 flex-wrap">
//           <div>
//             <label htmlFor="priority" className="block text-sm font-medium mb-1">
//               Filter by Priority
//             </label>
//             <select
//               id="priority"
//               value={priorityFilter}
//               onChange={(e) => setPriorityFilter(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">All</option>
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="priceSort" className="block text-sm font-medium mb-1">
//               Sort by Price
//             </label>
//             <select
//               id="priceSort"
//               value={priceSort}
//               onChange={(e) => setPriceSort(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">None</option>
//               <option value="asc">Low → High</option>
//               <option value="desc">High → Low</option>
//             </select>
//           </div>
//         </div>

//         {/* 📝 Task Form */}
//         <TaskForm />
//       </header>

//       {/* 📋 Task List */}
//       {loading ? (
//         <div className="text-center text-gray-500 text-lg">Loading tasks...</div>
//       ) : filteredTasks.length === 0 ? (
//         <div className="text-center text-gray-500 text-lg">No tasks found.</div>
//       ) : (
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredTasks.map((task) => (
//             <TaskCard key={task.id} task={task} />
//           ))}
//         </section>
//       )}

//       {/* 📸 Uploaded Images */}
//       <div className="mt-12">
//         <h2 className="text-xl font-semibold mb-4">📸 Display Uploaded Images</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {imageTasks.length === 0 ? (
//             <p className="text-gray-500 col-span-full">No image tasks found.</p>
//           ) : (
//             imageTasks.map((task) => (
//               <div key={task.id} className="border rounded p-2 bg-white shadow">
//                 <img
//                   src={task.imageUrl}
//                   alt="Uploaded"
//                   className="w-full h-40 object-cover rounded"
//                 />
//                 <p className="text-sm mt-2 text-center">{task.task}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import TaskCard from '../task/components/TaskCard';
import TaskForm from './components/TaskForm';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filteredTasks = tasks
    .filter((task) => (priorityFilter ? task.priority === priorityFilter : true))
    .sort((a, b) => {
      if (priceSort === 'asc') return a.price - b.price;
      if (priceSort === 'desc') return b.price - a.price;
      return 0;
    });

  const imageTasks = tasks.filter((task) => !!task.imageUrl);

  return (
    <div className="px-6 py-10 space-y-10 bg-gray-50 min-h-screen">
      {/* 🛠 Filters & Form */}
      <header className="flex flex-col lg:flex-row gap-6 justify-between items-start">
        <div className="flex gap-4 flex-wrap p-4 bg-white shadow rounded-lg">
          <div>
            <label htmlFor="priority" className="text-sm font-medium text-gray-600 mb-1 block">
              Filter by Priority
            </label>
            <select
              id="priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-gray-100 text-sm rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label htmlFor="priceSort" className="text-sm font-medium text-gray-600 mb-1 block">
              Sort by Price
            </label>
            <select
              id="priceSort"
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="bg-gray-100 text-sm rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">None</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </div>
        </div>

        {/* ➕ Add Task */}
        <div className="w-full lg:w-auto">
          <TaskForm />
        </div>
      </header>

      {/* 📋 Task List */}
      {loading ? (
        <div className="text-center text-gray-500 text-lg">🔄 Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">📭 No tasks match your filter.</div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      )}

      {/* 🖼 Uploaded Images */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📸 Uploaded Task Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imageTasks.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">No image uploads found.</p>
          ) : (
            imageTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-2 bg-white shadow-sm">
                <img
                  src={task.imageUrl}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="text-sm mt-2 text-center text-gray-700">{task.task}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
