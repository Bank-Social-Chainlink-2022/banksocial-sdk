import * as React from 'react'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'
// import {} from 'wagmi-banksocial'

const Page = () => {
  const isMounted = useIsMounted()

  if (!isMounted) return null
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
    </>
  )
}

export default Page
