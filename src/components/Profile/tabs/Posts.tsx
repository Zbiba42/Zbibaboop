import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material'
import { serverUrl } from '../../../config'
import { profile } from '../ProfileContent'
import { useEffect, useRef, useState } from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { motion, useAnimation, AnimationControls } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close'
interface Props {
  profile?: profile
}
export const Posts = ({ profile }: Props) => {
  const [isPostFormOpen, setPostFormOpen] = useState<boolean>(false)
  const controls = useAnimation()
  const AnimateFunction = async () => {
    if (isPostFormOpen === true) {
      await controls.start({ height: 'auto' })
    } else {
      await controls.start({ height: '100px' })
    }
  }
  const [pickerShown, setPickerShown] = useState<Boolean>(false)
  const PostContentRef = useRef<HTMLInputElement>(null)
  const addEmoji = (e: any) => {
    if (PostContentRef.current) {
      PostContentRef.current.value += e.native
    }
  }
  useEffect(() => {
    AnimateFunction()
  }, [isPostFormOpen])
  return (
    <>
      <div className="relative">
        {pickerShown ? (
          <div className="bg-white z-50 absolute top-[-10rem] right-14 outline outline-1 rounded-md PostsEmogiContainer">
            <span
              style={{
                content: '',
                backgroundColor: 'white',
                display: 'block',
                position: 'absolute',
                bottom: '45px',
                right: '-10px',
                width: '20px',
                height: '20px',
                transform: 'translateY(-50%) rotate(45deg)',
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
        <motion.div
          style={{
            padding: '1px',
            height: '100px',
            overflow: 'hidden',
          }}
          animate={controls as AnimationControls}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <Box
            sx={{
              p: 1,
              height: '100%',
              outline: '1px solid grey',
              boxShadow: 1,
              borderRadius: 2,
              position: 'relative',
              // backgroundColor: 'white',
            }}
          >
            {isPostFormOpen && (
              <button
                className="absolute top-1 right-2"
                onClick={() => setPostFormOpen(false)}
              >
                <CloseIcon sx={{ color: 'gray' }} />
              </button>
            )}

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
                onFocus={() => setPostFormOpen(true)}
                sx={{
                  width: '85%',
                  mb: 0.5,
                }}
                inputProps={{
                  style: { width: '100%' },
                }}
                multiline
                // rows={4}
                maxRows={4}
                placeholder="Nobody cares abt what ur gonna post"
                autoComplete="off"
                variant="standard"
                inputRef={PostContentRef}
                onKeyDown={(e) => {
                  e.key == 'Enter' && ''
                }}
              />

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
            {/* <Box
              sx={{
                mt: 1,
                p: 1,
                outline: '1px solid grey',
                boxShadow: 1,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              hna aybano files li pickiti
            </Box> */}
            <Box
              sx={{
                mt: 1,
                p: 1,
                outline: '1px solid grey',
                boxShadow: 1,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <h1 className="font-bold text-sm text-[#272838] capitalize text-left ">
                Add to your post
              </h1>
              <div className="w-6/12 flex justify-end gap-2">
                <Tooltip title="files">
                  <label htmlFor="file-input">
                    <IconButton component="span">
                      <i className="fa-regular fa-file"></i>
                    </IconButton>
                    <input
                      type="file"
                      id="file-input"
                      style={{ display: 'none' }}
                      multiple
                      accept="all"
                      // ref={filesRef}
                    />
                  </label>
                </Tooltip>
                <Tooltip title="images/videos">
                  <label htmlFor="images-input">
                    <IconButton component="span">
                      <i className="fa-solid fa-images"></i>
                    </IconButton>
                    <input
                      type="file"
                      id="images-input"
                      multiple
                      className="hidden"
                      accept="image/*"
                      // ref={filesRef}
                    />
                  </label>
                </Tooltip>
                <Tooltip title="tags">
                  <IconButton component="span">
                    <i className="fa-solid fa-user-tag"></i>
                  </IconButton>
                </Tooltip>
              </div>
              <Button variant="contained" size="medium" sx={{ marginLeft: 10 }}>
                Post
              </Button>
            </Box>
          </Box>
        </motion.div>
      </div>
    </>
  )
}
