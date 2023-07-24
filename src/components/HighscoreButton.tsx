import { mdiReload } from '@mdi/js'
import Icon from '@mdi/react'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setHighScore } from '../store/scoreSlice';

function HighscoreButton() {

  const [displayDialog, setDisplayDialog] = useState(false);
 
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch();
  const resetHighscore = () => {
    
    dispatch(setHighScore(0));
    // dialogRef.current?.close();
    setDisplayDialog(false);
  }


  return (
    <>

       {displayDialog && <dialog open>
            Are you sure you want to reset highscore?
            <div className="flex">
                <button className='btn btn-green' onClick={resetHighscore}>Yes</button>
                <button className='btn btn-red' onClick={() => setDisplayDialog(false)}>No</button>
            </div>
        </dialog> 
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

export default HighscoreButton