import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Content } from '../lib/enums';

export interface ContentState {
    savedContent: Content[];
    otherState: number;
}

const initialState: ContentState = {
    savedContent: [],
    otherState: 0,
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    addContent: (state, action: PayloadAction<Content>) => {
        console.log("Add content, new:", action.payload);
        const inContentItem: Content = action.payload;
        if (!inContentItem) {
            return;
        }

        if (state.savedContent.length === 0) {
            state.savedContent.push(inContentItem);
        }
        else { //Trick: Just for test, only keep one item for this demo
            state.savedContent[0] = inContentItem;
        }

        console.log("Add content, now becomes:", state.savedContent);
    },
    removeContent: (state, action: PayloadAction<string>) => {
        state.savedContent = state.savedContent.filter(data => data.id !== action.payload);
    },
    clearContent: (state) => {
        state.savedContent = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const {
    addContent, removeContent, clearContent
} = contentSlice.actions

export default contentSlice.reducer