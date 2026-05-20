import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Login from "./page/authpage/Login"
import Layout from "./components/layout/Layout"
import { Provider } from 'react-redux'
import { store } from "./utils/appStore"
import Profilt from "./page/Profile"
import Profile from "./page/Profile"
import FeedPage from "./page/FeedPage"
import Connections from "./components/connections/Connections"
import Requests from "./components/requests/Requests"
import Chat from "./components/chat_with_connections/Chat"
import RootNavigation from "./routes/RootNavigation"


function App() {

  return (
    <>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </>
  )
}

export default App
