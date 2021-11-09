import React, { useCallback, useContext, useEffect, useState } from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHTTP} from "../hooks/http.hook";
import Loader from "../components/Loader";
import LinksCard from "../components/LinksCard";

export const LinksPage = () => {
    const { token } = useContext(AuthContext)
    const { request, loading } = useHTTP()
    const [links, setLinks] = useState([])
    const fetchLinks = useCallback(async () => {
        try {
            const linksObj = await request('/api/link', 'GET', null, {
                authorization: `Bearer ${token}`,
            })
            setLinks(linksObj)
        } catch (error) {}
    }, [token, request])
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])
    if (loading) {
        return <Loader />
    }

    return (
        <>{!loading && <LinksCard links={links} />}</>
    );
};

