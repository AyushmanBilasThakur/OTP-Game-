import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: {
    score: 0,
    life: 3,
    isGameOver: false,
    highScore: localStorage.getItem("hs")
      ? Number(localStorage.getItem("hs"))
      : 0,
  },
  reducers: {
    incrementScore(state) {
      state.score++;
    },
    decrementScore(state) {
      state.score--;
    },
    setScore(state, { payload }: { payload: number }) {
      state.score = payload;
    },
    decrementLife(state) {
      state.life--;
    },
    incrementLife(state) {
      state.life++;
    },
    setLife(state, { payload }: { payload: number }) {
      state.life = payload;
    },
    setIsGameOver(state, { payload }: { payload: boolean }) {
      state.isGameOver = payload;
    },
    setHighScore(state, { payload }: { payload: number }) {
      localStorage.setItem("hs", String(payload));
      state.highScore = payload;
    },
  },
});

export const {
  incrementScore,
  decrementScore,
  incrementLife,
  decrementLife,
  setIsGameOver,
  setLife,
  setScore,
  setHighScore,
} = scoreSlice.actions;
export default scoreSlice.reducer;
