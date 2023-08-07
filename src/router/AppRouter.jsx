import React, {useEffect} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import {CheckingAuth} from "../ui/";
import {useSelector} from "react-redux";
import {useCheckAuth} from "../hooks/useCheckAuth.js";

export const AppRouter = () => {
     const status = useCheckAuth();

     if(status === 'checking'){ return <CheckingAuth/>}
  return (
    <Routes>
        {(status === "authenticated")
            ? <Route path="/*" element={<JournalRoutes/>}/>
            : <Route path="/auth/*" element={<AuthRoutes/>}/>
        }
        <Route path="*" element={<Navigate to={'/auth/login'}/>}/>
    </Routes>
  )
}
