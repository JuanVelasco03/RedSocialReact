import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

export const PublicLayout = () => {
    const {auth} = useAuth()
    return (
        <>
            {/* LAYOUT */}
            <Header />

            {/* Contenido principal */}
            <section className='layout_content'>
                {!auth._id ? <Outlet />
                :
                <Navigate to="/social" />}
            </section>
        </>
    )
}
