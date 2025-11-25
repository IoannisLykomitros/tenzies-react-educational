import Die from "./Die"
import { useState } from "react"

const App = () => {

    const [dice, setDice] = useState(generateAllNewDice())

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => Math.ceil(Math.random() * 6))
    }

    const diceElements = dice.map(num => <Die value={num} />)

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
        </main>
    )
}

export default App