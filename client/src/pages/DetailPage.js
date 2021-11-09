import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import LinkCard from '../components/LinkCard'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHTTP } from '../hooks/http.hook'

const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHTTP()
  const [link, setLink] = useState(null)
  const linkId = useParams().id
  const getLinks = useCallback(async () => {
    try {
      const linkObj = await request(`/api/link/${linkId}`, 'GET', null, {
        authorization: `Bearer ${token}`,
      })
      setLink(linkObj)
    } catch (error) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLinks()
  }, [getLinks])

  if (loading) {
    return <Loader />
  }
  return <>{!loading && link && <LinkCard link={link} />}</>
}

export default DetailPage
