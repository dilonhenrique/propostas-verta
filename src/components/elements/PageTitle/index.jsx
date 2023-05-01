import Head from 'next/head'
import React, { memo } from 'react'

function PageTitle({ children }) {
  return (
    <Head>
      <title>{children}</title>
    </Head>
  )
}

export default memo(PageTitle);
