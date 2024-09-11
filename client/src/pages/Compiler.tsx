import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { handleError } from "@/utils/handleError"
import { useDispatch } from "react-redux"
import { updateFullCode } from "@/redux/slices/compilerSlice"
import { toast } from "sonner"

export default function Compiler() {

  const { urlId } = useParams();
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/load", {
        urlId: urlId
      })
      dispatch(updateFullCode(response.data.fullCode))
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err?.response?.status == 500) {
          toast("Invalid URL, Default Code Loaded");
        }
      }
      handleError(err);
    }
  }

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlId]);

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]" defaultSize={50} >
          <HelperHeader />
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]" defaultSize={50} >
          <RenderCode />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
