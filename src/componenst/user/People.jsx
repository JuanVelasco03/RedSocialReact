import React, { useEffect, useState } from 'react'
import {Global} from "../../helpers/Global"
import { UserList } from './UserList'

export const People = () => {
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState([])
    const [more, setMore] = useState(true)
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async(nextPage = 1) => {
        //Efecto de carga
        setLoading(true)
        //Peticion para sacar los usuarios
        const request = await fetch(Global.url+"user/list/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "authorization" : localStorage.getItem("token")
            }
        })

        const data = await request.json();


        //Crear estado para liostarlos
        if(data.users && data.status == "success"){
            let newUsers = data.users;

            if(users.length >= 1){
                newUsers = [...users, ...data.users];
            }

            setUsers(newUsers)
            setFollowing(data.user_following)

            setLoading(false);

            //paginacion
            if(users.length + 5 >= data.total){
                setMore(false)
            }
        }
    }


    return (
    <>
        <header className="content__header">
            <h1 className="content__title">Gente</h1>
        </header>

        <UserList users={users} getUsers={getUsers} following={following} setFollowing={setFollowing} page={page} setPage={setPage} more={more} loading={loading} />
        <br />
    </>
    )
}
