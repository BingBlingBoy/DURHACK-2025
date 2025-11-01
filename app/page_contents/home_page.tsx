import Navbar from "~/utils/navbar"
import TitleCard from "./home_page_components/title_card"
import Review from "./home_page_components/reviews"

const Home2Page = () => {
    return (
        <>
            <Navbar/>
            <main className="px-20">
                <TitleCard/>
                <Review/>
            </main>
        </>
    )
}
export default Home2Page 