import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Login from "./page/authpage/Login"
import Layout from "./components/layout/Layout"


function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
