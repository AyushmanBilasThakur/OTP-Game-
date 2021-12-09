import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store'

function GameOver() {

    const score = useSelector((state: RootState) =>  state.score.score);
        return (
        <div className="centered">
            <h1>Game Over!</h1>
            <p>Your Score: {score}</p>
        </div>
    )
}

export default GameOver
