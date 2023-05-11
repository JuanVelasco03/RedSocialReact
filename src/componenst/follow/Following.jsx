import React, { useEffect, useState } from 'react'
import {Global} from "../../helpers/Global"
import { UserList } from '../user/UserList'
import { useParams } from 'react-router-dom'
import { getProfile } from '../../helpers/getProfile'
export const Following = () => {
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState([])
    const [more, setMore] = useState(true)
    const [following, setFollowing] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(true)
    const params = useParams();

    const userId = params.userId

    const token = localStorage.getItem("token");

    useEffect(() => {
        getUsers(1);
        getProfile(userId, setUserProfile);
    }, [])

    const getUsers = async(nextPage = 1) => {
        //Efecto de carga
        setLoading(true)

        //Sacar userId de la url


        //Peticion para sacar los usuarios
        const request = await fetch(Global.url+"follow/following/" + userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "authorization" : token
            }
        })

        const data = await request.json();

        let cleanUsers = [];

        //Recorrer y limpiar follows para sacar followed
        data.follows.forEach(follow => {
            cleanUsers = data.users = [...cleanUsers, follow.followed]
        })

        data.users = cleanUsers;

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
            <h1 className="content__title">Usuarios que sigue {userProfile.name} {userProfile.surname}</h1>
        </header>

        <UserList users={users} getUsers={getUsers} following={following} setFollowing={setFollowing} page={page} setPage={setPage} more={more} loading={loading} />
        <br />
    </>
    )
}
