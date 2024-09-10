import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"

export default function Compiler() {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]" defaultSize={50} >
          <HelperHeader />
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]" defaultSize={50} >
          two
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
