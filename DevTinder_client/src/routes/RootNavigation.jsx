import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/layout/Layout';
import FeedPage from '../page/FeedPage';
import Profile from '../page/Profile';
import Connections from '../components/connections/Connections';
import Requests from '../components/requests/Requests';
import Chat from '../components/chat_with_connections/Chat';
import Login from '../page/authpage/Login';

const RootNavigation = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* ── Public routes ── */}
        <Route path="/login" element={<Login />} />

        {/* ── Root redirect ── */}
        <Route path="/" element={<Navigate to="/feed" replace />} />

        {/* ── Protected routes ── */}
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
        </Route>

        {/* ── 404 fallback ── */}
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;
