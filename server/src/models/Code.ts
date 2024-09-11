import mongoose from "mongoose";

interface IcodeShema {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  }
}

const codeSchema = new mongoose.Schema<IcodeShema>({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  }
})

export const Code = mongoose.model("Code", codeSchema);