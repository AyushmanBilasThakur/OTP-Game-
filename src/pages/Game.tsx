import Browser from '../components/Browser'
import MessageBox from '../components/MessageBox'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store';
import { useEffect, useRef, useState } from 'react';
import loadNextSite from '../utility/loadNextSite';
import getOTP from '../utility/getOtP';
import { add_site, remove_first_site } from '../store/currentSitesSlice';
import { useDispatch } from 'react-redux';
import { setIsGameOver } from '../store/scoreSlice';

function Game() {

    const score = useSelector((state: RootState) => state.score.score);
    const isGameOver = useSelector((state: RootState) => state.score.isGameOver);

    const life = useSelector((state: RootState) => state.score.life);
    const centered: any = useRef(null);
    const currentSites = useSelector((state: RootState) => state.currentSites);

    const dispatch = useDispatch();

    const [messageText, setMessageText] = useState("");
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



     
    return (
        <div className="centered" ref={centered}>
            
            <a href="/" className="link">
                &lt;- Back to main menu
            </a>
            {
                isGameOver ?
                    <>
                        <h1>Game Over!</h1>
                        <p>You scored: {score}</p>
                    </>
                    :
                    <>
                        

                        <h3 className="score">Score: {score}</h3>
                        <h3 className="score">Errors allowed: {life}</h3>
                        {/* <h3 className="score">Time: {timer}</h3> */}

                        {
                            currentSites.length > 0 ? 
                                <Browser 
                                    url={currentSites[0].site_url} 
                                    key={currentSites[0].site_url + currentSites[0].otp}
                                    loadNewSite={loadNewSite}
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
            <a href="/game" className="btn btn-green">Restart</a>
        </div>
    )
}

export default Game
