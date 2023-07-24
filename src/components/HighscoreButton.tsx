import { mdiReload } from '@mdi/js'
import Icon from '@mdi/react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setHighScore } from '../store/scoreSlice';

function HighscoreButton() {

  const dialogRef = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch();
  const resetHighscore = () => {
    
    dispatch(setHighScore(0));
    dialogRef.current?.close();
  }


  return (
    <>

        <dialog ref={dialogRef}>
            Are you sure you want to reset highscore?
            <div className="flex">
                <button className='btn btn-green' onClick={resetHighscore}>Yes</button>
                <button className='btn btn-red' onClick={() => dialogRef.current?.close()}>No</button>
            </div>
        </dialog> 
        

        <button className="btn btn-red" onClick={() => dialogRef.current?.showModal()}>
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