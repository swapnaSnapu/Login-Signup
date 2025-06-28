// import Link from "next/link";

// export default function name() {
//     return(
//         <>
//         <Link href="Admin/login">Login</Link>
//         <Link href="Admin/ToDo">Add</Link>
//         <Link href="Admin/ToDisplay">ToDisplay</Link>
//         </>
//     )
// }



'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  const linkStyle = (path) => ({
    fontWeight: pathname === path ? 'bold' : 'normal',
    color: pathname === path ? 'blue' : 'black',
    textDecoration: 'none'
  });

  return (
    <nav style={{ padding: '1rem', display: 'flex', gap: '1rem', background: '#f0f0f0' }}>
      <Link href="Admin/login" >Login</Link>
      <Link href="Admin/signup" style={linkStyle('/Admin/signup')}>Signup</Link>
      {/* <Link href="Admin/dashboard" className="text-blue-600 hover:underline text-lg">
          Go to Dashboard
        </Link> */}
      {/* <Link href="/Admin/ToDo" style={linkStyle('/Admin/ToDo')}>Add</Link>
      <Link href="/Admin/ToDisplay" style={linkStyle('/Admin/ToDisplay')}>ToDisplay</Link> */}
    </nav>
  );
}
