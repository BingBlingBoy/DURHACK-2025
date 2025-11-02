import Navbar from "~/utils/navbar"
import SingleFileOpener from "~/utils/file_selector"

const Analyse2Page = () => {
    return (
        <>
            <Navbar/>
            <main className="p-8 bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 text-white min-h-screen">
                <div className="w-full flex flex-1 items-center justify-center leading-relaxed">
                    <SingleFileOpener />
                </div>
            </main>
        </>
    )
}
export default Analyse2Page 
