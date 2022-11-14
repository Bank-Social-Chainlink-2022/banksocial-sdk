import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm'
import { useMemo } from 'react'

export type BankSocialArgs = {
  network: 'polygon' | 'goerli'
}

export function useUploadIPFS({ network = 'polygon' }: BankSocialArgs) {
  const sdk = useMemo(() => new ThirdwebSDK(network), [network])

  const uploadIPFS = async ({ image }: { image: File }) => {
    const uri = await sdk.storage.upload(image)
    return uri
  }

  return {
    uploadIPFS,
  }
}
