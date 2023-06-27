import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { serverUrl } from '../../../config'
import { profile } from '../ProfileContent'
interface Props {
  profile?: profile
  profilePicRef: React.RefObject<HTMLInputElement>
  coverPicRef: React.RefObject<HTMLInputElement>
}
export const ImagesUpdate = ({
  profilePicRef,
  coverPicRef,
  profile,
}: Props) => {
  const [profileHover, setProfileHover] = useState(false)
  const [coverHover, setCoverHover] = useState(false)
  const realTimeImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()
    if (file) {
      reader.onload = (event) => {
        const dataURL = event?.target?.result
        const imgElement = document.getElementById(id) as HTMLImageElement
        if (imgElement && typeof dataURL === 'string') {
          imgElement.src = dataURL
        }
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <>
      <img
        src={serverUrl + profile?.CoverPath}
        alt=""
        draggable="false"
        className="w-[100%] h-48 object-cover "
        id="cover-image"
        onMouseEnter={() => setCoverHover(true)}
      />
      <input
        type="file"
        id="cover-image-input"
        ref={coverPicRef}
        className="hidden"
        accept="image/*,.gif"
        onChange={(event) => realTimeImageChange(event, 'cover-image')}
      />
      {coverHover && (
        <>
          <div
            className="h-48 w-[100%] bg-black bg-opacity-50  absolute top-0 "
            onMouseLeave={() => setCoverHover(false)}
          >
            <label
              htmlFor="cover-image-input"
              className="w-[100%] h-[100%] cursor-pointer rounded-full flex items-center justify-center"
            >
              <div>
                <EditIcon fontSize="large" sx={{ color: 'white' }} />
              </div>
            </label>
          </div>
        </>
      )}
      <img
        src={serverUrl + profile?.ProfilePath}
        alt=""
        id="profile-image"
        draggable="false"
        className=" m-3 w-40 h-40 object-cover rounded-full border border-black absolute top-[100px]"
        onMouseEnter={() => setProfileHover(true)}
      />
      <input
        type="file"
        id="profile-image-input"
        ref={profilePicRef}
        className="hidden"
        accept="image/*"
        onChange={(event) => realTimeImageChange(event, 'profile-image')}
      />
      {profileHover && (
        <>
          <div
            className="m-3 h-40 w-40 bg-black bg-opacity-50 rounded-full absolute top-[100px]"
            onMouseLeave={() => setProfileHover(false)}
          >
            <label
              htmlFor="profile-image-input"
              className="w-[100%] h-[100%] cursor-pointer rounded-full flex items-center justify-center"
            >
              <div>
                <EditIcon fontSize="large" sx={{ color: 'white' }} />
              </div>
            </label>
          </div>
        </>
      )}
    </>
  )
}
