import { Button } from './ui/button'
import { Save, SquareArrowOutUpRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { CompilerSliceStateType, updateCurrentLanguage } from '@/redux/slices/compilerSlice'
import { RootState } from '@/redux/store'
import { handleError } from '@/utils/handleError'
import axios from 'axios'

export default function HelperHeader() {

  const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);
  const handleSaveCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode: fullCode
      });
      console.log(response.data);
    } catch (err) {
      handleError(err);
    }
  }

  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center gap-1" >
      <div className="__btn_container flex gap-1">
        <Button className="flex justify-center items-center gap-1"
          onClick={handleSaveCode}
          variant="success">
          <Save size={20} />
          Save
        </Button>
        <Button className="flex justify-center items-center gap-1" variant="secondary">
          <SquareArrowOutUpRight size={18} />
          Share
        </Button>
      </div>
      <Select defaultValue={currentLanguage}
        onValueChange={(value) => {
          dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]));
        }}
      >
        <SelectTrigger className="w-[120px] bg-gray-800 focus:ring-0 select-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="css">CSS</SelectItem>
          <SelectItem value="javascript">JavaScript</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
