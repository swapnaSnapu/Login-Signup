// 'use client'
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../lib/firebase';

// export default function Signup() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert('Signup successful!');
//       router.push('/login');
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <h1>Sign Up</h1>
//       <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }





'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/Admin/login');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <a href="/Admin/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}











// "use client";
// import { useState } from "react";
// import { auth } from "../../lib/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSignup = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Signup successful!");
//       router.push("/App/Admin/dashboard");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Signup</h1>
//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleSignup}>Sign Up</button>
//     </div>
//   );
// }
