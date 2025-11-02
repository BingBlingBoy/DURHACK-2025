import Navbar from "~/utils/navbar"
import SingleFileOpener from "~/utils/file_selector"

const Analyse2Page = () => {
    return (
        <>
            <div className="flex item-center flex-col">
                <Navbar/>
                <div className="p-8 bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 text-white min-h-screen">
                    <div className="w-full flex flex-1 items-center justify-center leading-relaxed">
                        <SingleFileOpener />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Analyse2Page 
