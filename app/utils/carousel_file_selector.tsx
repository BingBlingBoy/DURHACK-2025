import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselProps = {
  activeItemIndex: number;
  setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
  imageData: FileList | null;
  previewData: string[];
};

const CarouselFileSelector: React.FC<CarouselProps> = ({
  activeItemIndex,
  setActiveItemIndex,
  imageData,
  previewData
}) => {
    if (!imageData || imageData.length === 0 || !previewData[activeItemIndex]) {
        return null;
    }
    return (
        <>
            <div className="w-full flex items-center justify-center gap-x-6">
                <button
                    onClick={() => {
                        setActiveItemIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
                    }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <ChevronLeft size={24} />
                </button>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className='text-3xl font-bold leading-relaxed'>Name: {imageData[activeItemIndex].name}</h1>
                        <img
                            key={activeItemIndex}
                            src={previewData[activeItemIndex]}
                            alt={`Preview ${activeItemIndex}`}
                            className="w-1/4 h-1/4 rounded-lg shadow"
                        />
                    </div>
                <button
                    onClick={() => {
                        setActiveItemIndex((prevIndex) => (prevIndex + 1) % 2);
                    }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </>
    );
}

export default CarouselFileSelector