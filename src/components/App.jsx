import { nanoid } from "nanoid"
import Die from "./Die"
import { useState } from "react"
import { useWindowSize } from 'react-use'
import ReactConfetti from "react-confetti"

const App = () => {
    const [dice, setDice] = useState(() => generateAllNewDice())

    let gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            }))
    }

    const rollDice = () => {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
    }

    const hold = (id) => {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    const diceElements = dice.map(dieObj => <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={() => hold(dieObj.id)} />)
    const { width, height } = useWindowSize()

    return (
        <main>
            {gameWon && <ReactConfetti width={width} height={height} />}
            <div>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="dice-container">
                {diceElements}
            </div>

            <button className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}

export default App