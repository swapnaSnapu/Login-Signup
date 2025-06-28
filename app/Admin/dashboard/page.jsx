

// 'use client';

// import { useAuth } from '../../../context/page';
// import { auth } from '../../lib/firebase';
// import { signOut } from 'firebase/auth';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function DashboardPage() {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user === null) {
//       router.push('/Admin/login');
//     }
//   }, [user, router]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push('/Admin/login');
//   };

//   if (!user) {
//     return <p className="text-center mt-10">Loading or redirecting...</p>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center space-y-4">
//         <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//         <p className="text-gray-600">Welcome, <strong>{user.email}</strong></p>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Auth check
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

  // ✅ Fetch todos summary
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'todos'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(items);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/Admin/login');
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-700">Welcome, <strong>{user.email}</strong> 👋</p>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold">📝 Your Tasks Summary</h2>
          <p>Total Tasks: {todos.length}</p>

          {todos.length > 0 ? (
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              {todos.slice(0, 3).map((todo) => (
                <li key={todo.id}>{todo.text}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm mt-2">No tasks yet. Start by adding some!</p>
          )}

          <button
            onClick={() => router.push('/Admin/ToDo')}
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to ToDo Page
          </button>
           <button
            onClick={() => router.push('/Admin/ToDisplay')}
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to profile Page
          </button>
        </div>
      </div>
    </div>
  );
}
