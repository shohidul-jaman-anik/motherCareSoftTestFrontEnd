import Image from 'next/image';
import Link from 'next/link';
import profileImg from "../../assets/profile.svg"

const Header = () => {
    const handleLogOut = () => {
        localStorage.removeItem('token');
        // navigate('/login');
        // setLoggedOut(true);
        window.location.reload();
    }
    return (
        <nav className="bg-gray-800 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>


                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block sm:ml-6">

                            <div className="flex space-x-4">
                                <Link href='/'>
                                    <h1 className="text-white text-2xl font-bold text-cyan-500" >Ad-din Pharmacetucale Ltd</h1>
                                </Link>
                                <Link href="/" className="btn btn-sm" aria-current="page">Home</Link>

                                <Link href="/dashboard" className="btn btn-sm ">Dashboard</Link>
                            </div>
                        </div>
                    </div>

                    {/* Notification */}




                    <div className=" absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                        <div className="dropdown dropdown-end">
                            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image src={profileImg}
                                        className='login-img '
                                        alt="img2" width={50} height={50} layout="responsive" />
                                </div>
                            </label>
                            <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                               
                                <li><Link href="" onClick={handleLogOut}>Logout</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>


            <div className="sm:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link href="/" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Home</Link>

                    <Link href="addApi" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Add Data</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;