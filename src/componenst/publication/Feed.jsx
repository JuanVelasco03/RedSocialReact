import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png"
import { Link, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth"
import { PublicationList } from "../publication/PublicationList";

export const Feed = () => {
    const { auth } = useAuth();
    const [publications, setPublications] = useState([])
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true)
    const token = localStorage.getItem("token");

    useEffect(() => {
        setMore(true)
        getPublications(1, false);
    }, [])

    const getPublications = async (page = 1, showNews = false) => {

        if(showNews){
            setPublications([]);
            setPage(1);
            page = 1;
        }

        const request = await fetch(Global.url + "publication/feed/" + page, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })

        const data = await request.json();

        if (data.status == "success") {

            let newPublications = data.publications;

            if (!showNews && publications.length >= 1) {
                newPublications = [...publications, ...data.publications];
            }

            setPublications(newPublications)

            if(!showNews && publications.length + 5 >= data.total){
                setMore(false)
            }

            if(data.pages <= 1){
                setMore(false)
            }

        }
        
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" onClick={() => getPublications(1, true)}>Mostrar nuevas</button>
            </header>

            <PublicationList
                publications={publications}
                getPublications={getPublications}
                setPublications={setPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />
            <br />
        </>
    )
}
