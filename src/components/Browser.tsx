import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {useDispatch, useSelector, } from 'react-redux';

import { RootState } from '../store';
import { decrementLife, incrementScore, setIsGameOver } from '../store/scoreSlice';

const Browser = ({
    children,
    loadNewSite,
    url,
    isResettingGame
}: {
    loadNewSite: Function,
    url: string,
    isResettingGame: boolean
} & React.ComponentProps<any>) => {

    const currentSites = useSelector((state: RootState) => state.currentSites)

    const [otp, setOTP] = useState(""); 
    const score = useSelector((state: RootState) => state.score.score)
    const isGameOver = useSelector((state: RootState) => state.score.isGameOver);
    const [isCurrentOTPCorrect, setIsCurrentOTPCorrect] = useState(true);
    
    const dispatch = useDispatch();
    const inp: any = useRef(null);

    function checkOTP(){
        if(otp != String(currentSites[0].otp)){
            setIsCurrentOTPCorrect(false);
            dispatch(decrementLife());
            document.body.classList.add("flash");
            document.body.addEventListener("animationend", () => {
                document.body.classList.remove("flash");
            });
            setOTP("");
        }
        else{
            dispatch(incrementScore());
            setOTP("");
            loadNewSite();
            setIsCurrentOTPCorrect(true);
        }
        if(inp.current){
            inp.current.focus();
        }
    }

    
    let maxTime: number;
    let timerHolder: number;
    
    const [timer, setTimer] = useState(maxTime = (10 - score % 5));
    
    const resetTime = () => {
        maxTime = (10 - score % 5);
    
        setTimer(maxTime);
    
        timerHolder = setInterval(() => {
            setTimer(prevTime => prevTime - 1)
        }, 1000);
    }

    useEffect(() => {
        if(isGameOver == true){
            resetTime();
        }
    }, [isResettingGame])

    useEffect(() => {
        
        resetTime();
        return(() => {
            resetTime();
            clearInterval(timerHolder); 
           
        })
    }, [])

    useEffect(() => {
        if(timer < 0){
            // clearInterval(timerHolder);
            dispatch(setIsGameOver(true));
        }
    }, [timer])

    

    return (
        <div className="browser-container">
            <progress value={timer} max={maxTime} /> 
            <div className="title-bar">{url}</div>
            <div className="browser-body">


                {children}
                
                <input autoFocus aria-autocomplete="none" name="game" ref={inp} type="number" autoComplete="none" accept="number" typeof="number" placeholder="Please enter the OTP here" value={otp} onChange={(e) => setOTP(e.target.value)} onKeyPress={(e) => {if(e.key == "Enter"){checkOTP()}}}/>

                {
                    isCurrentOTPCorrect ? 
                        <></>
                        :
                        <div className="danger">
                            You have entered wrong OTP
                        </div>
                }

                
                <button className="btn btn-green" onClick={() => checkOTP()}>
                    Send OTP
                </button>

                {/* <button className="btn btn-red" onClick={() => dispatch(decrement())}>
                    Mark as fake site
                </button> */}
            </div>

        </div>
    )
}

export default Browser
