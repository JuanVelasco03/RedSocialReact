import React, { useEffect, useState } from 'react'
import useAuth from "../../hooks/useAuth"
import avatar from "../../assets/img/user.png"
import {Global} from "../../helpers/Global"
import { Link } from 'react-router-dom';
import ReactTimeAgo from "react-time-ago"


export const UserList = ({users, getUsers, following, setFollowing, page, setPage, more, loading }) => {
    const {auth} = useAuth();
    const follow = async (userId) => {
        //Peticion al backend del follow
        const request = await fetch(Global.url + "follow/save", {
        method: "POST",
        body: JSON.stringify({ followed: userId }),
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
        },
        });

        const data = await request.json();
        //Cuando este correcto
        if (data.status == "error") {
        console.log(data.message);
        }

        setFollowing([...following, userId]);
    };

    const unfollow = async (userId) => {
        //Peticion al backend para borrar el follow
        const request = await fetch(Global.url + "follow/unfollow/" + userId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
        },
        });
        const data = await request.json();
        //Cuando este correcto
        if (data.status == "success") {
        //Actualizar estado de following
        //Filtrando los datos para eliminar el antiguo userId
        //Actualizar estado de following, filtrando para eliminar el follow

        let filterFollowings = following.filter(
            (followingUserId) => userId !== followingUserId
        );
        setFollowing(filterFollowings);
        }
    };

    const nextPage = () => {
        let next = page + 1
        setPage(next)
        getUsers(next);
    }

    return (
        <>
        <div className="content__posts">
        {users.map((user) => {
            return (
            <article className="posts__post" key={user._id}>
                <div className="post__container">
                <div className="post__image-user">
                    <Link to={"/social/perfil/"+user._id} className="post__image-link">
                    {user.image != "default.png" && (
                        <img
                        src={Global.url + "user/avatar/" + user.image}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                        />
                    )}
                    {user.image == "default.png" && (
                        <img
                        src={avatar}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                        />
                    )}
                    </Link>
                </div>
                <div className="post__body">
                    <div className="post__user-info">
                    <Link to={"/social/perfil/"+user._id} className="user-info__name">
                        {user.name}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link to={"/social/perfil/"+user._id} className="user-info__create-date">
                        <ReactTimeAgo date={user.createAt} locale="es-Es" />
                    </Link>
                    </div>
                    <h4 className="post__content">{user.bio}</h4>
                </div>
                </div>

                {user._id != auth._id && (
                <div className="post__buttons">
                    {!following.includes(user._id) && (
                    <button
                        className="post__button post__button--green"
                        onClick={() => follow(user._id)}
                    >
                        follow
                    </button>
                    )}

                    {following.includes(user._id) && (
                    <button
                        className="post__button"
                        onClick={() => unfollow(user._id)}
                    >
                        unfollow
                    </button>
                    )}
                </div>
                )}
            </article>
            );
        })}
        </div>
        {loading ? <div>Cargando...</div> : ""}
        {more ? 
            <div className="content__container-btn">
                <button className="content__btn-more-post" onClick={nextPage} >
                    Ver mas personas
                </button>
            </div>
            :
            ""
        }
    </>
    );
};
