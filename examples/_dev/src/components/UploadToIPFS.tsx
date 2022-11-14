import { ChangeEvent, useState } from 'react'
import { useUploadIPFS } from 'wagmi-banksocial'

export const UploadIPFS = () => {
  const [image, setImage] = useState<File>()

  /** Upload to IPFS */
  const { uploadIPFS } = useUploadIPFS({ network: 'polygon' })

  const saveImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const uploadImage = async () => {
    if (image) {
      const uri = await uploadIPFS({ image })
      console.log(uri)
      // return https://bafybeiajtb3lk3eazloxj3yqbqavlf4t4xbv3fklcecmeqkhdcsltqxwti.ipfs.dweb.link/1462950503_profile_picture_visionaire_cool_futuristic_full_length_epic_portrait_detailed__30_megapixel__4k__85_.png
    }
  }

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
        <button onClick={() => uploadImage()}>Upload</button>
      </div>
    </div>
  )
}
