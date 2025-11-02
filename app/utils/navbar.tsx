import { useState } from "react"
import { NavLink, Link } from "react-router"
import logo from "../assets/logo.png"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-slate-800 text-white px-8 py-5 shadow-lg flex items-center justify-between flex-row border-b border-blue-500/20">
                <div className="flex items-center gap-2 hover:scale-110 duration-300">
                    <img className="w-12 h-12 rounded-full" src={logo} alt="Logo"/>
                    <Link className="text-2xl font-bold tracking-wide hover:text-white-200 transition duration-300" to="/">
                        Iceberg
                    </Link>
                </div>
                
                <div className="hidden md:flex space-x-8 items-center">
                    <Link className="text-lg font-medium hover:text-blue-200 hover:scale-105 transition duration-300 relative group" to="/">
                        Home
                    </Link>
                    <Link className="text-lg font-medium hover:text-blue-200 hover:scale-105 transition duration-300 relative group" to="/analyse">
                        Analyse
                    </Link>
                </div>
                
                <div className="md:hidden">
                    <button 
                        onClick={toggleMenu}
                        className="text-white focus:outline-none hover:bg-white/10 p-2 rounded-lg transition duration-300"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            <div 
                className={`md:hidden bg-slate-800 border-b text-white border-blue-500/20 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
                    isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="flex flex-col space-y-4 px-8 py-6">
                    <Link className="text-lg font-medium hover:text-blue-200 transition duration-300 block py-2 hover:bg-white/5 rounded-lg px-3" to="/" onClick={toggleMenu}>
                        Home
                    </Link>
                    <Link className="text-lg font-medium hover:text-blue-200 transition duration-300 block py-2 hover:bg-white/5 rounded-lg px-3" to="/analyse" onClick={toggleMenu}>
                        Analyse
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar