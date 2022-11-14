import { ChangeEvent, useState } from 'react'
import { useUploadIPFS } from 'wagmi-banksocial'

interface Metadata {
  name?: string
  description?: string
  image?: File
}

export const UploadIPFS = () => {
  const [md, setMd] = useState<Metadata>({
    name: 'super cool',
    description: 'super cool description',
  })

  /** Upload to IPFS and get Metadata */
  const { uploadAndGetMetadata } = useUploadIPFS({ network: 'polygon' })

  const saveImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMd({ ...md, image: e.target.files[0] })
    }
  }

  const getMetadataUri = async () => {
    if (md && md.name && md.image && md.description) {
      const metadata = {
        name: md.name,
        description: md.description,
        image: md.image,
      }

      const uri = await uploadAndGetMetadata(metadata)
      console.log(uri)
      return uri
      // return ipfs://QmWBq5w8MgDdxWCUoVusp4Qxky5XmSbCCBUHTFwaRhF2eK/0
      // {"name":"super cool","description":"super cool description","image":"ipfs://QmNz7DdG4HAHefArR2EX42Fmo2sAkrA3C4WqKNQBFhWEqX/1462950503_profile_picture_visionaire_cool_futuristic_full_length_epic_portrait_detailed__30_megapixel__4k__85_.png"}
    }
  }

  // const uploadImage = async () => {
  //   if (image) {
  //     const uri = await uploadIPFS({ image })
  //     console.log(uri)
  //     // return https://bafybeiajtb3lk3eazloxj3yqbqavlf4t4xbv3fklcecmeqkhdcsltqxwti.ipfs.dweb.link/1462950503_profile_picture_visionaire_cool_futuristic_full_length_epic_portrait_detailed__30_megapixel__4k__85_.png
  //   }
  // }

  return (
    <div>
      <p>Upload to IPFS</p>
      <div>
        <input
          type={'file'}
          onChange={(e) => saveImage(e)}
          placeholder="token address"
          //   value={image}
        />
        <button onClick={() => getMetadataUri()}>
          Upload and get Metadata
        </button>
      </div>
    </div>
  )
}
