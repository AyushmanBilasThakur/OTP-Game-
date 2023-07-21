import React, { useRef, useState, useEffect } from 'react';
import {useDispatch, useSelector, } from 'react-redux';

import { RootState } from '../store';
import { decrementLife, decrementScore, incrementScore, setIsGameOver } from '../store/scoreSlice';

function Browser(props: any) {

    const currentSites = useSelector((state: RootState) => state.currentSites)

    const [otp, setOTP] = useState(""); 
    const score = useSelector((state: RootState) => state.score.score)
    const dispatch = useDispatch();
    const [isCurrentOTPCorrect, setIsCurrentOTPCorrect] = useState(true);

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
            props.loadNewSite();
            setIsCurrentOTPCorrect(true);
        }
        if(inp.current){
            inp.current.focus();
        }
    }
    let maxTime
    
    const [timer, setTimer] = useState(maxTime = (10 - score % 5));
    let x: number;
    useEffect(() => {
        
        let p = async () => {
            maxTime = (10 - score % 5);
            await setTimer(maxTime);
            x = setInterval(() => {
                 setTimer(prevTime => prevTime - 1)
            }, 1000)
        }

        p();

        return(() => {
            clearInterval(x);
        })
        
    }, [])

    useEffect(() => {
        if(timer < 0){
            clearInterval(x);
            dispatch(setIsGameOver(true));
        }
    }, [timer])

    

    return (
        <div className="browser-container">
            <progress value={timer} max={maxTime} /> 
            <div className="title-bar">{props.url}</div>
            <div className="browser-body">


                {props.children}
                
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
