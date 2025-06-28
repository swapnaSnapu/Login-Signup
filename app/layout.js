
// app/layout.jsx
import './globals.css'; // if you’re using Tailwind CSS or global styles
import { AuthProvider } from '../context/page'; // adjust if needed

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Protected dashboard page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
