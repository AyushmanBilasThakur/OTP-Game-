import Browser from '../components/Browser'
import MessageBox from '../components/MessageBox'
import { useSelector } from 'react-redux'
import { RootState } from '../store';
import { useEffect, useRef, useState } from 'react';
import loadNextSite from '../utility/loadNextSite';
import getOTP from '../utility/getOtP';
import { add_site, remove_first_site } from '../store/currentSitesSlice';
import { useDispatch } from 'react-redux';
import { setIsGameOver, setScore, setLife } from '../store/scoreSlice';
import { useNavigate } from 'react-router-dom';
import GameOver from './GameOver';
import HighscoreButton from '../components/HighscoreButton';
import Icon from '@mdi/react';
import { mdiHead, mdiHeart, mdiPacMan, mdiScoreboard } from '@mdi/js';

function Game() {

    const navigate = useNavigate();

    const score = useSelector((state: RootState) => state.score.score);
    const isGameOver = useSelector((state: RootState) => state.score.isGameOver);
    // const highScore = useSelector((state: RootState) =>  state.score.highScore);
    const life = useSelector((state: RootState) => state.score.life);
    const centered: any = useRef(null);
    const currentSites = useSelector((state: RootState) => state.currentSites);

    const dispatch = useDispatch();

    const [messageText, setMessageText] = useState("");
    const [isResettingGame, setResttingGame] = useState(false);
    const [messageTitle, setMessageTitle] = useState("");

    const loadNewSite = () => {
        let site = loadNextSite();
        let otp = getOTP(4 + Math.floor(score / 10));
        dispatch(remove_first_site());
        dispatch(add_site({...site, otp}));
        setMessageText(`Your OTP is ${otp}`)
        setMessageTitle(`${site.site_name}`)
    }

    useEffect(() => {
        loadNewSite();
    }, []);

    useEffect(() => {
        if(life <= 0){
            dispatch(setIsGameOver(true));
        }
    }, [life])

    const resetGame = () => {
        setResttingGame(true);
        dispatch(setIsGameOver(false));
        dispatch(setScore(0));
        dispatch(setLife(3));
    }


    const backToMenu = () =>{
        resetGame();
        navigate("/");
    }

    const backToGame = () =>{
        resetGame();
        navigate(0);
    }
     
    return (
        <div className="centered" ref={centered}>
            
            
            {
                isGameOver ?
                    <GameOver />
                    :
                    <>
                        
                        <div className='scorebar'>

                            <h3 className="score">
                                <Icon
                                    path={mdiPacMan}
                                    size={0.7} 
                                    style={{marginRight: "5px"}}
                                />

                                {score}</h3>
                            <div className="lives">
                                {
                                    new Array(life).fill(0).map((_,i) => (
                                        <Icon 
                                            key={i}
                                            path={mdiHeart}
                                            color="red"
                                            size={1}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                        {/* <h3 className="score">Time: {timer}</h3> */}

                        {
                            currentSites.length > 0 ? 
                                <Browser 
                                    url={currentSites[0].site_url} 
                                    key={currentSites[0].site_url + currentSites[0].otp}
                                    loadNewSite={loadNewSite}
                                    isResettingGame={isResettingGame}
                                >
                                    <p>{currentSites[0].site_description}</p>
                                </Browser>
                                :
                                <></>
                        }

                        {
                            (messageTitle && messageText) ? 
                            <MessageBox 
                                sender = {messageTitle}
                                message = {messageText}
                                key={messageTitle + messageText}
                            />
                            :
                            <></>
                        }  
                    </>

            }
            <br />

            <div className="nav-buttons">

                <button onClick={backToGame} className="btn btn-green">Restart</button>
                <button onClick={backToMenu} className="btn btn-red">
                        &lt;- Back to main menu
                </button>
                {
                    isGameOver && <HighscoreButton />
                }
            </div>
        </div>
    )
}

export default Game
