import React from 'react'
import {Routes, Route, BrowserRouter, Navigate, Link} from "react-router-dom";
import { PublicLayout } from '../componenst/layout/public/PublicLayout';
import { Login } from '../componenst/user/Login';
import { Register } from '../componenst/user/Register';
import { Logout } from '../componenst/user/Logout';
import { PrivateLayout } from '../componenst/layout/private/PrivateLayout';
import { Feed } from '../componenst/publication/Feed';
import { AuthProvider } from '../context/AuthProvider';
import { People } from '../componenst/user/People';
import { Config } from '../componenst/user/Config';
import { Following } from '../componenst/follow/Following';
import { Followers } from '../componenst/follow/Followers';
import { Profile } from '../componenst/user/Profile';

export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<PublicLayout/>}>
                        <Route index element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/registro' element={<Register/>} />
                    </Route>

                    <Route path='/social' element={<PrivateLayout/>}>
                        <Route index element={<Feed />} />
                        <Route path='feed' element={<Feed />} />
                        <Route path='logout' element={<Logout/>} />
                        <Route path='gente' element={<People/>} />
                        <Route path='ajustes' element={<Config/>} />
                        <Route path='siguiendo/:userId' element={<Following/>} />
                        <Route path='seguidores/:userId' element={<Followers/>} />
                        <Route path='perfil/:userId' element={<Profile/>} />
                    </Route>

                    <Route path='*' element={
                        <p>
                            <h1>Error 404</h1>
                            <Link to="/">Volver al Inicio</Link>
                        </p>
                                            }>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
