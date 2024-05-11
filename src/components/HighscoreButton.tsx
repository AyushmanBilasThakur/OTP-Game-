import { useDispatch } from "react-redux";
import { setHighScore } from "../store/scoreSlice";

import { PiArrowCounterClockwiseDuotone } from "react-icons/pi";

/* 
 
 function HighscoreButton() {

 const [displayDialog, setDisplayDialog] = useState(false);
 
   const dialogRef = useRef<HTMLDialogElement>(null);
   const dispatch = useDispatch();
   const resetHighscore = () => {
    
     dispatch(setHighScore(0));
     dialogRef.current?.close();
         setDisplayDialog(false);
    }


 return (
     <>

        {displayDialog && <div className='dialog'>
             <p>
               Are you sure you want to reset highscore?
             </p>
             <div className="flex">
                 <button className='btn btn-green' onClick={resetHighscore}>Yes</button>
                 <button className='btn btn-red' onClick={() => setDisplayDialog(false)}>No</button>
             </div>
         </div> 
       }
         <button className="btn btn-red" onClick={() => setDisplayDialog(true)}>
             <Icon 
                 path = {mdiReload}
                 size = {0.7}
             />
             Reset Highscore
         </button>
     </>

   )
}
*/

function HighscoreButton() {
  const dispatch = useDispatch();

  const resetHighScore = () => {
    if (confirm("Are you sure you want to reset the highscore?")) {
      dispatch(setHighScore(0));
    }
  };

  return (
    <button className="btn btn-red" onClick={resetHighScore}>
      <PiArrowCounterClockwiseDuotone />
      Reset Highscore
    </button>
  );
}

export default HighscoreButton;
