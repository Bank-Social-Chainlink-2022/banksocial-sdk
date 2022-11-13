import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type BankSocialArgs = {
  API_URL: string
  contractAddress: string
  contractABI: any
  network: 'polygon' | 'goerli'
}
/**
 * @returns all activities (contract events)
 *
 * @example
 * const { activities } = useBankSocialActivity({
 *   API_URL,
 *   contractAddress: memberCardAddress,
 *   contractABI: memberCardABI,
 *   network: 'polygon', // 'goerli'
 * })
 */
export function useBankSocialActivity({
  API_URL,
  contractAddress,
  contractABI,
  network = 'polygon',
}: BankSocialArgs) {
  const [activities, setActivities] = useState([])
  const sdk = useMemo(() => new ThirdwebSDK(network), [])

  const getEvents = useCallback(async () => {
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
  }, [])
  useEffect(() => {
    getEvents()
  }, [getEvents])

  return {
    activities,
  }
}
