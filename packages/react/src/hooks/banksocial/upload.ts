import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm'
import { useMemo } from 'react'

export type BankSocialArgs = {
  network: 'polygon' | 'goerli'
}

export type GetMetadata = {
  name: string
  description: string
  imageUri: string
}

export type UploadAndGetMetadata = {
  name: string
  description: string
  image: File
}

export function useUploadIPFS({ network = 'polygon' }: BankSocialArgs) {
  const sdk = useMemo(() => new ThirdwebSDK(network), [network])

  const uploadIPFS = async ({ image }: { image: File }) => {
    const uri = await sdk.storage.upload(image)
    return uri
  }

  const getMetadata = async ({ name, description, imageUri }: GetMetadata) => {
    const metadata = {
      name: name,
      description: description,
      image: imageUri,
    }

    const uri = await sdk.storage.upload(metadata)
    return uri
  }

  const uploadAndGetMetadata = async ({
    name,
    description,
    image,
  }: UploadAndGetMetadata) => {
    const metadata = {
      name: name,
      description: description,
      image: image,
    }

    const uri = await sdk.storage.upload(metadata)
    return uri
  }

  return {
    uploadIPFS,
    getMetadata,
    uploadAndGetMetadata,
  }
}
