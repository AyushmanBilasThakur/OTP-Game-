import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        score: 0,
        life: 3,
        isGameOver: false
    },
    reducers: {
        incrementScore(state){
            state.score++;
        },
        decrementScore(state){
            state.score--;
        },
        decrementLife(state){
            state.life--;
        },
        incrementLife(state){
            state.life++;
        },
        setIsGameOver(state, payload){
            state.isGameOver = Boolean(payload)
        }

    }
})

export const {incrementScore, decrementScore, incrementLife, decrementLife, setIsGameOver} = scoreSlice.actions
export default scoreSlice.reducer;