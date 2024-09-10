import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Headers from "./components/Header"
import Home from "./pages/Home"
import Compiler from "./pages/Compiler"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Headers />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
