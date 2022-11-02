import * as React from 'react'

import { useBankSocial } from 'wagmi-banksocial'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()
  const { data } = useBankSocial({
    addressOrName: 'awkweb.eth',
  })

  if (!isMounted) return null
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
      <p>BankScial</p>
      <div>
        Balance: {data?.formatted} {data?.symbol}
      </div>
    </>
  )
}

export default Page
