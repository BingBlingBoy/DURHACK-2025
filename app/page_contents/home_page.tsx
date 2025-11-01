import Navbar from "~/utils/navbar"
import TitleCard from "./home_page_components/title_card"
import Review from "./home_page_components/reviews"

const Home2Page = () => {
    return (
        <>
            <Navbar/>
            <main className="p-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white min-h-screen">
                <TitleCard/>
                <Review/>
            </main>
        </>
    )
}
export default Home2Page 