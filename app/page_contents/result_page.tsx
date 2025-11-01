import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router"
import { ChevronLeft, ChevronRight, Ship, Skull, Heart } from 'lucide-react';
import Navbar from "~/utils/navbar";

const Result2Page = () => {
    const location = useLocation();
    const data = (location.state as { combinedData?: any })?.combinedData;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [revealed, setRevealed] = useState(false);
    
    useEffect(() => {
        if (currentSlide === 0) {
            const timer = setTimeout(() => setRevealed(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setRevealed(false);
        }
    }, [currentSlide]);
    
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 2);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 2) % 2);
    
    const SurvivalSlide = () => (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
            <div className="mb-8 animate-pulse">
                <Ship size={80} className="text-blue-300" />
            </div>

            <h1 className="text-5xl font-bold mb-12 text-center animate-fadeIn">
                Your Titanic Journey
            </h1>

            <div className={`transition-all duration-1000 ${revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                {data.prediction.survived ? (
                    <div className="flex flex-col items-center">
                        <Heart size={120} className="text-green-400 animate-bounce mb-6" />
                        <h2 className="text-6xl font-bold text-green-400 mb-4">SURVIVED!</h2>
                        <p className="text-2xl text-gray-300">You made it to safety</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Skull size={120} className="text-red-400 animate-pulse mb-6" />
                        <h2 className="text-6xl font-bold text-red-400 mb-4">DID NOT SURVIVE</h2>
                        <p className="text-2xl text-gray-300">Lost at sea</p>
                    </div>
                )}
            </div>

            <div className="mt-12 grid grid-cols-5 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Class</p>
                    <p className="text-2xl font-bold">{data.values.Pclass}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Sex</p>
                    <p className="text-2xl font-bold">{data.values.Sex === 1 ? 'M' : 'F'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Age</p>
                    <p className="text-2xl font-bold">{data.values.Age}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Fare</p>
                    <p className="text-2xl font-bold">£{data.values.Fare}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Port</p>
                    <p className="text-2xl font-bold">{data.values.Embarked === 1 ? 'S' : data.values.Embarked === 2 ? 'C' : 'Q'}</p>
                </div>
            </div>
        </div>
    );
    const JustificationSlide = () => (
        <div className="h-full bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white p-12 overflow-y-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Analysis & Justification</h1>

            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl transform transition-all hover:scale-105 duration-300">
                    <h3 className="text-2xl font-semibold mb-3 text-blue-300">Passenger Class: Third Class</h3>
                    <p className="text-gray-200 leading-relaxed">{data.justification.Pclass}</p>
                </div>

                <div className="bg-white/10 backdrop-blur p-6 rounded-xl transform transition-all hover:scale-105 duration-300">
                    <h3 className="text-2xl font-semibold mb-3 text-blue-300">Ticket Fare: £{data.values.Fare}</h3>
                    <p className="text-gray-200 leading-relaxed">{data.justification.Fare}</p>
                </div>

                <div className="bg-white/10 backdrop-blur p-6 rounded-xl transform transition-all hover:scale-105 duration-300">
                    <h3 className="text-2xl font-semibold mb-3 text-blue-300">Embarcation Port: Southampton</h3>
                    <p className="text-gray-200 leading-relaxed">{data.justification.Embarked}</p>
                </div>

                <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur p-6 rounded-xl border-2 border-red-500/50">
                    <h3 className="text-2xl font-semibold mb-3 text-red-300">Final Verdict</h3>
                    <p className="text-gray-200 leading-relaxed">
                        Based on historical data from the Titanic disaster, passengers with these characteristics had a {data.prediction.survived ? 'high' : 'low'} probability of survival.
                        The survival rate was heavily influenced by passenger class, with third-class passengers facing significantly lower survival rates.
                    </p>
                </div>
            </div>
        </div>
    );

    
    return (
        <>
        <Navbar />
        <div className="w-full h-screen relative bg-slate-900">
            <div className="absolute inset-0">
                {currentSlide === 0 ? <SurvivalSlide /> : <JustificationSlide />}
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4">
                <button
                    onClick={prevSlide}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="flex gap-2">
                    {[0, 1].map((i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-white w-8' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="absolute top-4 right-4 text-white/60 text-sm">
                Slide {currentSlide + 1} / 2
            </div>
        </div>

    </>
    )
}
export default Result2Page