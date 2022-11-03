import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm'
import { ethers } from 'ethers'
import { useEffect, useMemo, useState } from 'react'

export type BankSocialArgs = {
  API_URL: string
  contractAddress: string
  contractABI: any
}

export function useBankSocialActivity({
  API_URL,
  contractAddress,
  contractABI,
}: BankSocialArgs) {
  const [activities, setActivities] = useState([])
  const sdk = useMemo(() => new ThirdwebSDK('mumbai'), [])

  async function getEvents() {
    /** initiate contracts */
    const contract = await sdk.getContract(contractAddress, contractABI)

    /** config filter */
    const provider = new ethers.providers.JsonRpcProvider(API_URL)
    const blockNumber = await provider.getBlockNumber()
    const filters = {
      fromBlock: 0,
      toBlock: blockNumber,
    }

    /** get events */
    const eventsQuery = await contract.events.getAllEvents(filters)
    console.log('useActivity: eventsQuery', eventsQuery)
    setActivities(eventsQuery)
  }
  useEffect(() => {
    getEvents()
  }, [])

  return {
    activities,
  }
  // return {
  //   /** SocialBankCore */
  //   createDAO: () => {},
  //   joinDAO: () => {},
  //   depositInDAO: () => {},
  //   unstakeInDAO: () => {},
  //   unstakeFullInDAO: () => {},
  //   propose: () => {},
  //   vote: () => {},
  //   daoActivities: daoEvents,
  //   vaultActivities: {},
  //   memberActivities: {},
  //   /** ??? */
  //   socialBankActivities: {},
  // }
}
