import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({title="ChatTalk",description="This is a chat app called ChatTalk"}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title