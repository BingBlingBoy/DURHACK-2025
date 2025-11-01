const TitleCard = () => {
    return (
        <main className="flex items-center justify-center pt-12">
            <div className="flex justify-center text-center flex-1 items-center py-20 flex-col gap-y-8">
                <h1 className="text-7xl w-[50rem] font-bold leading-tight">
                    How likely are you to <span className="text-red-500 font-bold">SURVIVE</span> the Titanic?
                </h1>
                <p className="w-[55rem] text-lg text-blue-100 leading-relaxed">
                    Here with the <span className="font-semibold text-white">Partially Unemployed Team</span>, we answer one of the most important questions since human conception, comparable
                    to famous problems like <span className="font-semibold text-white">P versus NP</span> and <span className="font-semibold text-white">Hilbert's fifteenth problem</span>.
                    Based on your Hinge profile and your last five watched shows on Netflix, would you survive the Titanic?
                </p>
            </div>
        </main>
    )
}
export default TitleCard