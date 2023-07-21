import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Xwrapper } from 'react-xarrows';
import Xarrow from "react-xarrows";

function MainMenu(){
    return (
        <div className="centered">
            <MessageBox 
                sender="Welcome aboard"
                message="Game version 0.3"
            />

            <Xwrapper>

                <div id="messageBoxLocator"></div>

                <p id="importantInfo" className="note">
                    Keep an eye over here, the OTP Messages will come and go 
                </p>

                <Xarrow 
                    start={"importantInfo"} 
                    end={"messageBoxLocator"} 
                    startAnchor={"top"}
                    endAnchor={"auto"}
                    color="#eee"
                    curveness={1}
                    dashness={true}
                />

            </Xwrapper>

            <div className="title-pitcher">
                <h1>The OTP Game</h1>
                <p>Yet another fun game by Ayushman</p>
            </div>

            <div className="nav-buttons">
                <Link className="btn btn-green" to="/game">PLAY</Link>
                <Link className="btn btn-green" to="/about">ABOUT</Link>
            </div>

            
        </div>
    )
}

export default MainMenu;