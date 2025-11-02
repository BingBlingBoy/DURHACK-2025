import { useRef, useState, useEffect } from "react";
import useIsVisible from "~/hooks/useIsVisible";
import icebergImage from "../../assets/iceberg.jpeg";

const TitleCard = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const isVisible1 = useIsVisible(ref1);
    const isVisible2 = useIsVisible(ref2);
    const isVisible3 = useIsVisible(ref3);
    
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="flex items-center justify-center">
            <div 
                className="relative flex justify-center text-center flex-1 items-center py-20 flex-col gap-y-12 bg-center bg-cover bg-no-repeat bg-fixed h-screen overflow-hidden"
                style={{
                    backgroundImage: `url(${icebergImage})`,
                    backgroundPositionY: `${scrollY * 0.008}px`
                }}
            >
                {/* Optional: Add overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="relative z-10 w-full">
                    <h1 
                        ref={ref1}
                        className={`text-7xl max-w-[50rem] text-shadow-lg mx-auto font-bold leading-tight transition-opacity duration-1000 ${isVisible1 ? "opacity-100" : "opacity-0"}`}
                    >
                        How likely are you to <span className="text-red-500 font-bold">SURVIVE</span> the Titanic?
                    </h1>
                    
                    <div className="w-full max-w-6xl mt-12 px-8 mx-auto">
                        <div 
                            ref={ref2}
                            className={`mb-8 transition-all duration-1000 ${isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        >
                            <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">Problems as Complex as Ours</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div 
                                className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 transition-all duration-1000 delay-200 hover:scale-105 hover:border-slate-600/70 ${isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            >
                                <h3 className="text-xl font-bold mb-3 text-white">P versus NP</h3>
                                <p className="text-sm text-gray-200">One of the most famous unsolved problems in computer science and mathematics</p>
                            </div>
                            
                            <div 
                                className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 transition-all duration-1000 delay-400 hover:scale-105 hover:border-slate-600/70 ${isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            >
                                <h3 className="text-xl font-bold mb-3 text-white">Hilbert's 15th Problem</h3>
                                <p className="text-sm text-gray-200">A mathematical challenge that has puzzled minds for over a century</p>
                            </div>
                            
                            <div 
                                ref={ref3}
                                className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 transition-all duration-1000 delay-700 hover:scale-105 hover:border-slate-600/70 ${isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            >
                                <h3 className="text-xl font-bold mb-3 text-white">Titanic Survival</h3>
                                <p className="text-sm text-gray-200">The question that keeps humanity awake at night: would YOU survive?</p>
                            </div>
                        </div>
                    </div>
                    
                    <p className={`w-full max-w-4xl mx-auto text-lg text-white leading-relaxed drop-shadow-lg transition-opacity duration-1000 mt-12 ${isVisible3 ? "opacity-100" : "opacity-0"}`}>
                        Here with the <span className="font-semibold text-white">Partially Unemployed Team</span>, we answer one of the most important questions since human conception, comparable
                        to famous problems like <span className="font-semibold text-white">P versus NP</span> and <span className="font-semibold text-white">Hilbert's fifteenth problem</span>.
                        Based on your Hinge profile and your last five watched shows on Netflix, would you survive the Titanic?
                    </p>
                </div>
            </div>
        </main>
    );
}

export default TitleCard;