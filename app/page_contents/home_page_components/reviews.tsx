import { useRef, useState } from "react";
import Carousel from "~/utils/carousel";
import jack from "../../assets/jack.jpeg"
import rose from "../../assets/rose.jpeg"


const Review = () => {
    const carouselData = useRef([
    {
      title: "Jack Dawson",
      image: jack,
      stars: [0,0,0,0,0],
      review: "This was so accurate I nearly died.",
      rating: 4 
    },
    {
      title: "Rose DeWitt Bukater",
      image: rose,
      stars: [0], 
      review: "Fuck Jack",
      rating: 5 
    },
    ]);

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    return (
        <>
        <h1 className="font-bold text-4xl">Reviews</h1>
        <div className="grid place-items-center">
          <Carousel
            activeItemIndex={activeItemIndex}
            setActiveItemIndex={setActiveItemIndex}
            carouselData={carouselData.current}
          />
        </div>
        </>
    );
}

export default Review