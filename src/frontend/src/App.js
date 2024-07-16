import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout";
import UserLayout from './Users/Layouts/UserLayout';

export function App() {
  return (
    <div className="app"> 
      <Routes>
          <Route path='/' element={<Navigate to='/user/home' />} />
          <Route path='/user/*' element={<UserLayout />} />
          <Route path='/admin' element={<Navigate to='/admin/home' />} />
          <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </div>
  );
}

export default App;
