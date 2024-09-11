import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react"

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  }
  currentLanguage: "html" | "css" | "javascript";
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `<!-- Write Your HTML Code Here -->
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Document</title>
  </head>
  <body>
    
  </body>
</html>`,
    css: `/* Write Your CSS Code Here */
*{
  margin: 0;
  padding: 0;
}`,
    javascript: `// Write Your JavaScript Code Here
console.log("JS is working")`,
  },
  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateFullCode: (state, action: PayloadAction<CompilerSliceStateType["fullCode"]>) => {
      state.fullCode = action.payload;
    }
  },
})

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue, updateFullCode } = compilerSlice.actions;