import * as React from 'react'

import {
  memberCardABI,
  memberCardAddress,
  useBankSocialActivity,
} from 'wagmi-banksocial'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
  const { activities } = useBankSocialActivity({
    API_URL: API_URL,
    contractAddress: memberCardAddress,
    contractABI: memberCardABI,
  })

  async function log() {
    console.log('daoActivities', activities)
  }

  if (!isMounted) return null
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
      <p>BankScial</p>
      <div>Balance: Not defined</div>
      <button onClick={log}>hello</button>
    </>
  )
}

export default Page
