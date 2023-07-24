import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Xwrapper } from 'react-xarrows';
import Xarrow from "react-xarrows";
import {  useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { setHighScore } from "../store/scoreSlice";
import HighscoreButton from "../components/HighscoreButton";

function MainMenu(){

    const dispatch = useDispatch();


    useEffect(() => {
        if(localStorage){
            const hs = localStorage.getItem("hs");
            if(hs) dispatch(setHighScore(parseInt(hs)));
        }
    }, [])

    const highScore = useSelector((state: RootState) => state.score.highScore);
    

    return (
        <div className="centered">
            <MessageBox 
                sender="Welcome aboard"
                message="Game version 0.5"
            />

            <Xwrapper>

                <div id="messageBoxLocator"></div>

                <p id="importantInfo" className="note">
                    Keep an eye over here, the OTP Messages will come and go 
                </p>

                <div className="arrowWrapper">
                    <Xarrow 
                        start={"importantInfo"} 
                        end={"messageBoxLocator"} 
                        startAnchor={"auto"}
                        endAnchor={"auto"}
                        color="#eee"
                        curveness={1}
                        dashness={true}
                    />
                </div>


            </Xwrapper>

            <div className="title-pitcher">
                <h1>The OTP Game</h1>
                <p>Enter the OTP from above before the time runs out!</p>
                <p className="highscore">Highest Score: {highScore}</p>
            </div>

            <div className="nav-buttons">
                <Link className="btn btn-green" to="/game">Play</Link>
                <Link className="btn btn-green" to="/about">About</Link>
                <HighscoreButton />
            </div>

            
        </div>
    )
}

export default MainMenu;