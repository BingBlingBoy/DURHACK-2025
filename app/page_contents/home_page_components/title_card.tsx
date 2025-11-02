import { useRef } from "react";
import useIsVisible from "~/hooks/useIsVisible";

const TitleCard = () => {
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const isVisible1 = useIsVisible(ref1);
    const isVisible2 = useIsVisible(ref2);
    const isVisible3 = useIsVisible(ref3);
    
    return (
        <main className="flex items-center justify-center pt-12">
            <div className="flex justify-center text-center flex-1 items-center py-20 flex-col gap-y-12">
                <h1 className={`text-7xl w-[50rem] font-bold leading-tight ${isVisible1 ? "opacity-100 " : "opacity-0"}`}>
                    How likely are you to <span className="text-red-500 font-bold">SURVIVE</span> the Titanic?
                </h1>
                <div className="w-full max-w-6xl mt-12 px-8">
                    <div 
                        ref={ref1}
                        className={`mb-8 transition-all duration-1000 ${isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    >
                        <h2 className="text-3xl font-bold mb-4 text-white">Problems as Complex as Ours</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div 
                            ref={ref2}
                            className={`bg-slate-800 backdrop-blur-sm border border-slate-800/30 rounded-xl p-8 transition-all duration-1000 delay-200 hover:scale-105 hover:border-slate-700/50 ${isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        >
                            <h3 className="text-xl font-bold mb-3 text-white">P versus NP</h3>
                            <p className="text-sm text-white">One of the most famous unsolved problems in computer science and mathematics</p>
                        </div>
                        
                        <div 
                            ref={ref2}
                            className={`bg-slate-800 backdrop-blur-sm border border-slate-800/30 rounded-xl p-8 transition-all duration-1000 delay-400 hover:scale-105 hover:border-slate-700/50 ${isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        >
                            <h3 className="text-xl font-bold mb-3 text-white">Hilbert's 15th Problem</h3>
                            <p className="text-sm text-white">A mathematical challenge that has puzzled minds for over a century</p>
                        </div>
                        
                        <div 
                            ref={ref3}
                            className={`bg-slate-800 backdrop-blur-sm border border-slate-800/30 rounded-xl p-8 transition-all duration-1000 delay-700 hover:scale-105 hover:border-slate-700/50 ${isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        >
                            <h3 className="text-xl font-bold mb-3 text-white">Titanic Survival</h3>
                            <p className="text-sm text-white">The question that keeps humanity awake at night: would YOU survive?</p>
                        </div>
                    </div>
                </div>
                <p className={`w-full text-lg text-white leading-relaxed ${isVisible3 ? "opacity-100" : "opacity-0"}`}>
                    Here with the <span className="font-semibold text-white">Partially Unemployed Team</span>, we answer one of the most important questions since human conception, comparable
                    to famous problems like <span className="font-semibold text-white">P versus NP</span> and <span className="font-semibold text-white">Hilbert's fifteenth problem</span>.
                    Based on your Hinge profile and your last five watched shows on Netflix, would you survive the Titanic?
                </p>
                
            </div>
        </main>
    )
}

export default TitleCard