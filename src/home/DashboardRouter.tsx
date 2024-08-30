import {Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

export function DashboardRouter(){
   return (
      <>
        <Routes>
            <Route path="/dashboard/home">
                <Dashboard/>
            </Route>
            <Route path="*">
                <Navigate to='/dashboard'/>;
            </Route>
        </Routes>
      </>
   );
}