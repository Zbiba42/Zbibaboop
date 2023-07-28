import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material'
import { serverUrl } from '../../../../config'
import { useEffect, useRef, useState } from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { motion, useAnimation, AnimationControls } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close'
import { SearchTags } from './SearchTags'

interface Props {
  ProfilePath?: string
  Fullname?: string
}

export const PostForm = ({ ProfilePath, Fullname }: Props) => {
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
  const [tagsShown, setTagsShown] = useState<Boolean>(false)
  const [previews, setPreviews] = useState<
    Array<{
      type: string
      url: string
    }>
  >([])

  const handleFileInputChange = (e: any) => {
    const files = e.target.files
    const newPreviews: Array<{ type: string; url: string }> = []

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const blobUrl = URL.createObjectURL(file)
        const preview = { type: file.type, url: blobUrl }
        newPreviews.push(preview)
      }
    }

    setPreviews(newPreviews)
  }

  useEffect(() => {
    AnimateFunction()
  }, [isPostFormOpen])
  return (
    <div className="relative">
      {pickerShown && (
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
      )}
      {tagsShown && (
        <div className="bg-white z-50 absolute top-[-13rem] right-14 outline outline-1 rounded-lg ">
          <span
            style={{
              content: '',
              backgroundColor: 'white',
              display: 'block',
              position: 'absolute',
              bottom: '-20px',
              left: '45%',
              width: '20px',
              height: '20px',
              transform: 'translateY(-50%) rotate(45deg)',
              outline: 'solid 1px',
              zIndex: 0,
            }}
          ></span>
          <SearchTags />
        </div>
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
              src={serverUrl + ProfilePath}
              alt=""
              draggable="false"
              className=" w-12 h-12 object-cover rounded-full border border-black "
            />
            <h1 className=" font-bold text-lg text-[#272838] capitalize text-left ">
              {Fullname}
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
              maxRows={4}
              placeholder="Nobody cares abt what ur gonna post"
              autoComplete="off"
              variant="standard"
              inputRef={PostContentRef}
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

          {previews.length > 0 && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '95%',
                  borderRadius: '10px 10px 0 0 ',
                  overflow: 'hidden',
                  margin: '0 auto',
                }}
              >
                {previews.slice(0, 2).map((preview, index) => {
                  return (
                    <div key={index} className="w-6/12">
                      {preview.type.includes('image') ? (
                        <img
                          src={preview.url}
                          alt="Preview"
                          style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <video
                          controls
                          style={{
                            width: '100%',
                            height: 'auto',
                          }}
                        >
                          <source src={preview.url} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )
                })}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '95%',
                  borderRadius: '0 0 10px 10px',
                  overflow: 'hidden',
                  margin: '0 auto',
                }}
              >
                {previews.slice(2, 5).map((preview, index) => {
                  return (
                    <div key={index} className="w-4/12 relative">
                      {index == 2 && (
                        <div className="w-full h-full absolute flex justify-center items-center  backdrop-blur-[1px]">
                          <h3 className="text-xl text-center text-white font-medium m-1">
                            +{previews.length - 5}
                          </h3>
                        </div>
                      )}
                      {preview.type.includes('image') ? (
                        <img
                          src={preview.url}
                          alt="Preview"
                          style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <video
                          controls={index == 2 ? false : true}
                          style={{
                            width: '100%',
                            height: 'auto',
                          }}
                        >
                          <source src={preview.url} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}

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
            <div className="w-5/12 flex justify-end gap-2">
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
                    accept="image/*, video/*"
                    onChange={handleFileInputChange}
                    // ref={filesRef}
                  />
                </label>
              </Tooltip>
              <Tooltip title="tags">
                <IconButton component="span" onClick={() => setTagsShown(true)}>
                  <i className="fa-solid fa-user-tag"></i>
                </IconButton>
              </Tooltip>
            </div>
            <Button variant="contained" size="medium" sx={{ marginLeft: 14 }}>
              Post
            </Button>
          </Box>
        </Box>
      </motion.div>
    </div>
  )
}
