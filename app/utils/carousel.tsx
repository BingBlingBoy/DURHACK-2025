import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa6";


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
    orange: "#F2C265",
    grey: "a9a9a9"
}

const Carousel: React.FC<CarouselProps> = ({
  activeItemIndex,
  setActiveItemIndex,
  carouselData,
}) => {
    return (
        <>
            <div className="w-full flex flex-1 items-center gap-2">
                <button
                    onClick={() => {
                        // activeItemIndex !== 0 &&
                            setActiveItemIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
                    }}
                    className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-white bg-black bg-opacity-20 hover:bg-opacity-60 duration-200"
                >
                    <MdKeyboardArrowLeft />
                </button>
                <div
                    className="w-full grid place-items-center rounded-lg h-[200px] duration-500"
                >
                    <div className="w-full flex flex-1 items-center justify-between flex-row gap-4 p-5">
                        <img className="h-24 w-24 rounded-full" src={carouselData[activeItemIndex].image} alt="Image of Jack" />
                        <div className="flex flex-1 flex-col">
                            <p className="font-bold">{carouselData[activeItemIndex].title}</p>
                            <p>{carouselData[activeItemIndex].review}</p>
                        </div>
                        <div key={activeItemIndex} className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    size={24}
                                    color={carouselData[activeItemIndex].rating > index ? colors.orange : colors.grey}
                                />
                            ))}
                        </div>
                        <p>({carouselData[activeItemIndex].rating} Stars)</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        // activeItemIndex !== carouselData.length - 1 &&
                            setActiveItemIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
                    }}
                    className="min-w-[30px] h-[30px] rounded-full grid place-items-center text-white bg-black bg-opacity-20 hover:bg-opacity-60 duration-200"
                >
                    <MdKeyboardArrowRight />
                </button>
            </div>
        </>
    );
};
export default Carousel;