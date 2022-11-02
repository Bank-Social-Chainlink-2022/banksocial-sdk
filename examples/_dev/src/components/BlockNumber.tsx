import { useBlockNumber } from 'wagmi-banksocial'

export const BlockNumber = () => {
  const { data } = useBlockNumber({ watch: true })
  return <div>{data}</div>
}
