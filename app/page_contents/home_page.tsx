import Navbar from "~/utils/navbar"
import TitleCard from "./home_page_components/title_card"
import Review from "./home_page_components/reviews"

const Home2Page = () => {
    return (
        <>
            <Navbar/>
            <div className="p-20 bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 text-white min-h-screen">
                <TitleCard />
                <Review />
            </div>
        </>
    )
}
export default Home2Page 