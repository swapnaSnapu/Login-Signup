


// // ✅ app/Admin/login/page.jsx

// 'use client'

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../lib/firebase'; // using alias

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push('/Admin/dashboard'); // 👈 Redirect to dashboard
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-5"
//       >
//         <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Login
//         </button>

//         <p className="text-sm text-center text-gray-600">
//           Don&apos;t have an account?{' '}
//           <a href="/Admin/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase'; // ✅ Make sure `db` is exported
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ensureUserProfile = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName || 'Anonymous',
        email: user.email,
        dob: '', // You can ask for DOB later or leave it empty for now
        photoURL: user.photoURL || '',
      });
      console.log('✅ Created user profile in Firestore');
    } else {
      console.log('✅ Profile already exists');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await ensureUserProfile(user); // 🔄 Ensure profile exists in Firestore

      router.push('/Admin/dashboard'); // 👈 Redirect to dashboard
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/Admin/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
