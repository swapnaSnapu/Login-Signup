'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

export default function ToDisplay() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
      } else {
        setUser(firebaseUser);

        // Load profile from Firestore
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            console.log('User document not found.');
          }
        } catch (error) {
          console.error('Error getting profile:', error);
        }

        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!profile) {
  return (
    <div className="text-center text-red-600">
      <p>Profile data not found in Firestore.</p>
      <p>Please ensure a document exists at <code>users/{user.uid}</code>.</p>
    </div>
  );
}


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#800000]">Your Profile</h1>
      
      <div className="flex flex-col items-center gap-4">
        <img
          src={profile.photoURL || user.photoURL || '/default-avatar.png'}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div className="text-lg text-center">
          <p><strong>Name:</strong> {profile.name || user.displayName || 'N/A'}</p>
          <p><strong>User ID:</strong> {user.uid}</p>
          <p><strong>Email:</strong> {profile.email || user.email}</p>
          <p><strong>Date of Birth:</strong> {profile.dob || 'Not Provided'}</p>
        </div>
      </div>
    </div>
  );
}



// 'use client'
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../lib/firebase';

// export default function ToDisplayPage() {
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
//       <h1>ToDisplay Page - Protected</h1>
//       <p>Welcome, {user.email}</p>
//     </div>
//   );
// }
