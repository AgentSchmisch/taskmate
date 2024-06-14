import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Header() {
    const customStyles = {
        elements: {
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
                        <a className="text-xl text-black" href="#">Tasks</a>
                    </div>

                    <div className='flex items-center'>
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