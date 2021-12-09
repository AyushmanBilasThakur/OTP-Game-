import { createSlice } from "@reduxjs/toolkit";
import { currentSite } from "../interfaces/currentSite";

const currentSitesSlice = createSlice({
    name: 'currentSites',
    initialState: Array<currentSite>(),
    reducers: {
        add_site(state, {payload}){
            state.push(payload);
        },
        remove_site(state, {payload}){
            return state.filter(e => e.site_name == payload.site_name)
        },
        remove_first_site(state){
            return state.filter((e,i) => i !== 0);
        }
        
    }
})

export const {add_site, remove_site, remove_first_site} = currentSitesSlice.actions
export default currentSitesSlice.reducer;