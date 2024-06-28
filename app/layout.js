import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css';
import Header from './components/Header.jsx';

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <title>Taskmate</title>
      <body>
        {/* clerk is used for authentification with google */}
        <ClerkProvider>
          <Header />
          <main className='bg-[#181c24] h-full'>
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  )
}