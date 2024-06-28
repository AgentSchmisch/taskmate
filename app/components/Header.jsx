import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

// ********************************
// This is the Navbar Component
// ********************************

export default function Header() {
    const customStyles = {
        elements: {
            // styling the Users avatar in the navbar
            userButtonAvatarBox: {
                height: "3rem", 
                width: "3rem", 
            },
        },
    };

    return (
            <>
                <div className='flex flex-row bg-white items-center justify-between p-4'>
                    
                    <div className='flex flex-row'>
                        <a href='/' className='text-2xl font-bold text-black'>Taskmate</a>
                    </div>

                    <div className='flex flex-row space-x-4'>
                        <a className="text-xl text-black" href="/">Home</a>
                        <a className="text-xl text-black" href="/">Tasks</a>
                        <a className="text-xl text-black" href="/notes">Notes</a>
                    </div>

                    <div className='flex items-center'>
                        {
                            //adding the corresponding buttons if a user is logged in or signed out
                        }
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton appearance={customStyles} />
                        </SignedIn>
                    </div>

                </div>
            </>
    )
}