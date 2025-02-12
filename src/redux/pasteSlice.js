import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
    name: 'counter',
    initialState: {
        pastes: localStorage.getItem("pastes")
            ? JSON.parse(localStorage.getItem("pastes"))
            : [],
    },
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste created successfully..");
        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);

            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Updated successfully..");
            }
        },
        resetToPastes: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Deleted successfully..");
            }
        },
    },
});

export const { addToPastes, updateToPastes, resetToPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
