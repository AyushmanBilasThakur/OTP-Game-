import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store'
import { useEffect, useState } from 'react';
import { setHighScore, setIsGameOver } from '../store/scoreSlice';

function GameOver() {


    const [isThisHighScore, setIsThisHighScore] = useState(false);
    const score = useSelector((state: RootState) =>  state.score.score);
    const highScore = useSelector((state: RootState) =>  state.score.highScore);
    const dispatch = useDispatch();

    useEffect(() => {
        if(score >= highScore){
            dispatch(setHighScore(score));
            setIsThisHighScore(true);
        }
    },[])

    return (
        <div className="game-over">
            <h1>Game Over!</h1>
            <div className="highscoreHolder">
                <p className='highscore'>Highest Score: {highScore}</p>            
                { isThisHighScore && <div className='recordflash'>New Record!</div> }
            </div>
            <p>Your Score: {score}</p>
        </div>
    )
}

export default GameOver
