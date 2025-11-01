import { NavLink, Link } from "react-router"

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md flex flex-row">
            <div className="container mx-auto flex justify-between items-center">
                <a href="#">MyLogo</a>
            </div>
            <div className="hidden md:flex space-x-6">
                <Link to="/"><a href="#" className="hover:text-gray-300 transition duration-300">Home</a></Link>
                <Link to="/home2"><a href="#" className="hover:text-gray-300 transition duration-300">Home2</a></Link>
                {/* <a href="#" className="hover:text-gray-300 transition duration-300">Start</a>
                <a href="#" className="hover:text-gray-300 transition duration-300">Credit</a> */}
            </div>

            <div className="md:hidden">
                <button id="menu-toggle" className="text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </nav>
    )
}
export default Navbar