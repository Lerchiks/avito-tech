import { Navigate, Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import AdDetails from "./pages/AdDetails";
import AdEdit from "./pages/AdEdit";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/ad/:id" element={<AdDetails/>}/>
      <Route path="/ad/:id/edit" element={<AdEdit/>}/>
      <Route path="*" element={<Navigate to="/" replace />}/>
    </Routes>
  )
}

export default App;