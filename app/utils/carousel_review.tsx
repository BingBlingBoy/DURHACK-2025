import { FaStar } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselItem = {
  title: string;
  image: string;
  review: string;
  rating: number;
};

type CarouselProps = {
  activeItemIndex: number;
  setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
  carouselData: CarouselItem[];
};

const colors = {
    orange: "#F59E0B",
    grey: "#9CA3AF"
}

const Carousel: React.FC<CarouselProps> = ({
  activeItemIndex,
  setActiveItemIndex,
  carouselData,
}) => {
    return (
        <>
            <div className="w-full flex flex-1 items-center gap-6">
                <button
                    onClick={() => {
                        setActiveItemIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
                    }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="w-full grid place-items-center rounded-xl h-[200px] duration-500 bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
                    <div className="w-full flex flex-1 items-center justify-between flex-row gap-6 p-6">
                        <img className="h-24 w-24 rounded-full border-4 border-white/20 shadow-lg object-cover" src={carouselData[activeItemIndex].image} alt="Reviewer" />
                        <div className="flex flex-1 flex-col gap-2">
                            <p className="font-bold text-xl text-white">{carouselData[activeItemIndex].title}</p>
                            <p className="text-blue-100 leading-relaxed">{carouselData[activeItemIndex].review}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div key={activeItemIndex} className="flex items-center gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        size={20}
                                        color={carouselData[activeItemIndex].rating > index ? colors.orange : colors.grey}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-blue-200">({carouselData[activeItemIndex].rating} Stars)</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setActiveItemIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
                    }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </>
    );
};

export default Carousel