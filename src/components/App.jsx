import { nanoid } from "nanoid"
import Die from "./Die"
import { useState, useRef, useEffect } from "react"
import { useWindowSize } from 'react-use'
import ReactConfetti from "react-confetti"

const App = () => {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const rollButtonRef = useRef(null)

    let gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            rollButtonRef.current.focus()
        }
    }, [gameWon])

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
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <div>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="dice-container">
                {diceElements}
            </div>

            <button ref={rollButtonRef} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}

export default App