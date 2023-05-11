import React from "react";
import avatar from "../../assets/img/user.png"
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth"
import ReactTimeAgo from "react-time-ago";

export const PublicationList = ({publications, getPublications, page, setPage, more, setMore, setPublications}) => {

    const {auth} = useAuth()

    const token = localStorage.getItem("token");

    const nextPage = () => {
        let next = page + 1
        setPage(next);
        getPublications(next);
    }

    const deletePublication = async(publicationId) => {
        const request = await fetch(Global.url + "publication/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })

        const data = await request.json()

        // getPublications(1, true);
        // setPage(1)
        // setMore(true)

        let filterPublications = publications.filter(publication => publication._id !== publicationId)

        setPublications(filterPublications)
        console.log(publications)
    }

    return (
        <>
            <div className="content__posts">
                {publications.map(publication => {
                    return (
                        <article className="posts__post" key={publication._id}>
                            <div className="post__container">
                                <div className="post__image-user">
                                    <Link to={"/social/perfil/" + publication.user._id} className="post__image-link">
                                        {publication.user.image != "default.png" && <img src={Global.url + "user/avatar/" + publication.user.image} className="container-avatar__img" alt="Foto de perfil" />}
                                        {publication.user.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil 2" />}
                                    </Link>
                                </div>
                                <div className="post__body">
                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">
                                            {publication.user.name}
                                        </a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">
                                            <ReactTimeAgo date={publication.created_at} locale="es-Es"/>
                                        </a>
                                    </div>
                                    <h4 className="post__content">{publication.text}</h4>
                                    {publication.file && <img src={Global.url + "publication/media/" + publication.file} className="publication_img" />}
                                </div>
                            </div>

                            {auth._id == publication.user._id &&
                                <div className="post__buttons">
                                    <button className="post__button delete-publication" onClick={() => deletePublication(publication._id)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            }
                        </article>
                    )
                })}
            </div>
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}