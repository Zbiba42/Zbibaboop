import { Box, IconButton, TextField } from '@mui/material'
import { serverUrl } from '../../../config'
import { profile } from '../ProfileContent'
import { useRef, useState } from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import AttachFileIcon from '@mui/icons-material/AttachFile'

interface Props {
  profile?: profile
}
export const Posts = ({ profile }: Props) => {
  const [pickerShown, setPickerShown] = useState<Boolean>(false)
  const PostContentRef = useRef<HTMLInputElement>(null)
  const addEmoji = (e: any) => {
    if (PostContentRef.current) {
      PostContentRef.current.value += e.native
    }
  }
  return (
    <>
      <Box
        sx={{
          p: 1,
          outline: '1px solid grey',
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <div className="flex items-center gap-2">
          <img
            src={serverUrl + profile?.ProfilePath}
            alt=""
            draggable="false"
            className=" w-12 h-12 object-cover rounded-full border border-black "
          />
          <h1 className=" font-bold text-lg text-[#272838] capitalize text-left ">
            {profile?.Fullname}
          </h1>
        </div>
        <div className="w-full flex items-end gap-4 justify-end">
          <TextField
            sx={{
              width: '85%',
            }}
            inputProps={{
              style: { width: '100%' },
            }}
            multiline
            rows={4}
            maxRows={4}
            placeholder="Nobody cares abt what ur gonna post"
            autoComplete="off"
            variant="standard"
            inputRef={PostContentRef}
            onKeyDown={(e) => {
              e.key == 'Enter' && ''
            }}
          />
          {pickerShown ? (
            <div className="bg-white absolute top-28 right-10 outline outline-1 rounded-md PostsEmogiContainer">
              <span
                style={{
                  content: '',
                  display: 'block',
                  position: 'absolute',
                  bottom: '-20px',
                  right: '8px',
                  width: '20px',
                  height: '20px',
                  transform: 'translateY(-50%) rotate(45deg)',
                  backgroundColor: 'white',
                  outline: 'solid 1px',
                  zIndex: 0,
                }}
              ></span>

              <Picker
                data={data}
                theme="light"
                emojiSize={20}
                maxFrequentRows={2}
                emojiButtonSize={30}
                previewPosition={'none'}
                onEmojiSelect={addEmoji}
                onClickOutside={() => setPickerShown(false)}
              />
            </div>
          ) : (
            ''
          )}

          <IconButton
            onClick={() => {
              setTimeout(() => {
                setPickerShown(true)
              }, 10)
            }}
          >
            <i className="fa-regular fa-face-smile"></i>
          </IconButton>
        </div>
        <Box
          sx={{
            mt: 1,
            p: 1,
            outline: '1px solid grey',
            boxShadow: 1,
            borderRadius: 2,
            display: 'flex',
            gap: 2,
          }}
        >
          <h1 className="font-bold text-sm text-[#272838] capitalize text-left ">
            Add to your post
          </h1>
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}
