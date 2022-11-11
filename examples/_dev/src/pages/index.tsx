import {
  daoVaultAddress,
  memberCardABI,
  memberCardAddress,
  useAccount,
  useBankSocialActivity,
  useCreateDAO,
  useDaosById,
  useHarvest,
  useMemberMint,
  usePropose,
  useStake,
  useUSDCApprove,
  useUnstake,
  useVote,
} from 'wagmi-banksocial'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
  const { activities } = useBankSocialActivity({
    API_URL,
    contractAddress: memberCardAddress,
    contractABI: memberCardABI,
  })

  const { address } = useAccount()

  const { write: _createDAO } = useCreateDAO({
    initBaseURI: 'test',
    maxSupply: 10,
    minStake: 1,
    name: 'test',
  })
  const { write: _stake } = useStake({ amount: 1 })
  const { write: _unstake } = useUnstake({ tokenId: 0 })
  const _harvest = useHarvest()
  const { write: _propose } = usePropose({
    amount: 0,
    isToken: false,
    description: 'test',
    receiver: address ? address : '0x123',
    tokenId: 0,
  })
  const { write: _vote } = useVote({ vote: true, proposalId: 0, tokenId: 0 })
  const _mint = useMemberMint()
  const { write: _approveUSDC } = useUSDCApprove({
    spender: daoVaultAddress,
    amount: 1,
  })

  /** Read Contract */
  const { data: daoIds } = useDaosById({ daoId: 1 })
  console.log('🚀 ~ file: index.tsx ~ line 57 ~ Page ~ daoIds', daoIds)

  const createDAO = () => {
    _createDAO && _createDAO()
  }

  const stake = () => {
    _stake && _stake()
  }

  const unstake = () => {
    _unstake && _unstake()
  }

  const harvest = () => {
    if (_harvest) {
      const { write } = _harvest
      write && write()
    }
  }

  const propose = () => {
    _propose && _propose()
  }

  const vote = () => {
    _vote && _vote()
  }

  const mint = () => {
    if (_mint) {
      const { write } = _mint
      write && write()
    }
  }

  const approve = () => {
    _approveUSDC && _approveUSDC()
  }

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
      <button onClick={log}>Log</button>
      <p>Interact with socialbankcore</p>
      <button onClick={() => createDAO()}>create dao</button>
      <p>Interact with Vault</p>
      <button onClick={() => approve()}>Approve</button>
      <button onClick={() => stake()}>Stake</button>
      <button onClick={() => unstake()}>Unstake</button>
      <button onClick={() => harvest()}>harvest</button>
      <p>Interact with DAO</p>
      <button onClick={() => propose()}>Propose</button>
      <button onClick={() => vote()}>Vote</button>
      <p>Interact with Member</p>
      <button onClick={() => mint()}>Mint</button>
    </>
  )
}

export default Page
