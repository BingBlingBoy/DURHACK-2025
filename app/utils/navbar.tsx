import { NavLink, Link } from "react-router"
import logo from "../assets/logo.png"

const Navbar = () => {
    return (
        <nav className="bg-slate-800 text-white px-8 py-5 shadow-lg flex items-center justify-between flex-row border-b border-blue-500/20">
            <div className="flex items-center">
                <img className="w-12 h-12 rounded-full" src={logo} alt="Logo"/>
                <Link to="/">
                <a href="#" className="text-2xl font-bold tracking-wide hover:text-blue-200 transition duration-300">Iceberg</a>
                </Link>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
                <Link to="/">
                    <a href="#" className="text-lg font-medium hover:text-blue-200 transition duration-300 relative group">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
                    </a>
                </Link>
                <Link to="/analyse">
                    <a href="#" className="text-lg font-medium hover:text-blue-200 transition duration-300 relative group">
                        Analyse
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
                    </a>
                </Link>
            </div>
            <div className="md:hidden">
                <button id="menu-toggle" className="text-white focus:outline-none hover:bg-white/10 p-2 rounded-lg transition duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </nav>
    )
}
export default Navbar