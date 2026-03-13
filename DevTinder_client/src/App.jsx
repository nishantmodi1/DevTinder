import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Login from "./page/authpage/Login"
import Layout from "./components/layout/Layout"
import { Provider } from 'react-redux'
import { store } from "./utils/appStore"
import Profilt from "./page/Profile"
import Profile from "./page/Profile"
import FeedPage from "./page/FeedPage"


function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<FeedPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
