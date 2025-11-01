const TitleCard = () => {
    return (
        <main className="flex items-center justify-center pt-4">
            <div className="flex justify-center text-center flex-1 items-center py-16 flex-col gap-y-8">
                <h1 className="text-8xl w-[50rem]">How likely are you to <span className="text-red-600 font-semibold">SURVIVE</span> the titanic?!?!</h1>
                <p className="w-[55rem]">
                    Here with the partially unemployed team, we answer one of the most important questions since human conception compareable
                    to famous problems like <span className="font-semibold">P versus NP</span> and <span className="font-semibold">Hilbert's fifthteenth problem</span>.
                    Based on your hinge profile and your last watched five shows on netflix, would you survive the titanic?
                </p>
            </div>
        </main>
    )
}

export default TitleCard