import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";

function MainMenu(){
    return (
        <div className="centered">
            <MessageBox 
                sender="Welcome aboard"
                message="Game version 0.1 Alpha"
            />
            <h1 className="heading">OTP</h1>
            
            <Link className="btn btn-green" to="/game">PLAY</Link>
            <br />
            <Link className="btn btn-green" to="/about">ABOUT</Link>
            
        </div>
    )
}

export default MainMenu;