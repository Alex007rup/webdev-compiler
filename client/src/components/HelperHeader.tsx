import { Button } from './ui/button'
import { CodeXml, Copy, RefreshCcw, Save, SquareArrowOutUpRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from 'react-redux'
import { CompilerSliceStateType, updateCurrentLanguage } from '@/redux/slices/compilerSlice'
import { RootState } from '@/redux/store'
import { handleError } from '@/utils/handleError'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function HelperHeader() {

  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [shareBtn, setShareBtn] = useState<boolean>(false);

  const navigate = useNavigate();

  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId])

  const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);
  const handleSaveCode = async () => {
    setSaveLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode: fullCode
      });
      navigate(`/compiler/${response.data.url}`, { replace: true });
    } catch (err) {
      handleError(err);
    } finally {
      setSaveLoading(false);
    }
  }

  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center gap-1" >
      <div className="__btn_container flex gap-1">
        <Button className="flex justify-center items-center gap-1"
          onClick={handleSaveCode}
          disabled={saveLoading}
          variant="success"
        >
          {saveLoading ? (
            <>
              <RefreshCcw className="animate-spin" />
              Saving
            </>
          ) : (
            <>
              <Save size={20} />
              Save
            </>
          )}
        </Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1">
              <SquareArrowOutUpRight size={18} />
              Share
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-col gap-2">
                <DialogTitle className="flex items-center gap-2 select-none">
                  <CodeXml />
                  Share Your Code
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-2">
                  <div className="__url_copy flex justify-center items-center gap-3">
                    <input type="text" disabled className="w-full px-2 py-2 rounded bg-slate-800" value={window.location.href} />
                    <Button variant="outline" onClick={() => {
                      window.navigator.clipboard.writeText(window.location.href);
                      toast("Link copied to clipboard.");
                    }}>
                      <Copy size={16} />
                    </Button>
                  </div>
                  <p className="text-center select-none">
                    Anyone who has this link will be able to view this.
                    <p className="text-amber-300">Explore the coder inside you.</p>
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
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