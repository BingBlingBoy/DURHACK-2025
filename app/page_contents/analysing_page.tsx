import Navbar from "~/utils/navbar"
import SingleFileOpener from "~/utils/file_selector"

const Analyse2Page = () => {
    return (
        <>
            <Navbar/>
            <main className="px-20 py-20">
                <SingleFileOpener />
            </main>
        </>
    )
}
export default Analyse2Page 
