import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
  sender: string;
  message: string;
}

function MessageBox(props: IProps) {
  let messageBox: any = useRef(null);
  let score = useSelector((state: RootState) => state.score.score);
  let timeoutListener;
  let timeoutTime = 5000;

  useEffect(() => {
    timeoutTime -= Math.min(3000, 500 * Math.floor(score / 5));

    if (messageBox.current != null) {
      messageBox.current.classList.add("slide-in");
      if (score == 0) {
        return;
      }
      timeoutListener = setTimeout(removeMessage, timeoutTime);
    }
  }, [messageBox.current]);

  function removeMessage() {
    if (messageBox.current) {
      messageBox.current.classList.add("fade-up-and-over");
      messageBox.current.addEventListener("animationend", () => {
        messageBox.current.style.display = "none";
      });
    }
  }

  return (
    <div className="message-box" ref={messageBox}>
      <button className="close-button" onClick={() => removeMessage()}>
        X
      </button>
      <h3>{props.sender}</h3>
      <p>{props.message}</p>
    </div>
  );
}

export default MessageBox;
