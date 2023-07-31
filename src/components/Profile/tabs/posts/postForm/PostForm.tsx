import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material'
import { serverUrl } from '../../../../../config'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, AnimationControls } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import axios from 'axios'
import { PostEmogies } from './PostEmogies'
import { PostSearchFriendsForTag } from './PostSearchFriendsForTag'
import { PostFilesPreview } from './PostFilesPreview'
import { PostTagsPreview } from './PostTagsPreview'

interface Props {
  ProfilePath?: string
  Fullname?: string
}

export const PostForm = ({ ProfilePath, Fullname }: Props) => {
  // animation
  const [isPostFormOpen, setPostFormOpen] = useState<boolean>(false)
  const controls = useAnimation()
  const AnimateFunction = async () => {
    if (isPostFormOpen === true) {
      await controls.start({ height: 'auto' })
    } else {
      await controls.start({ height: '100px' })
    }
  }
  // imogies
  const [pickerShown, setPickerShown] = useState<Boolean>(false)
  const PostContentRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef<HTMLInputElement>(null)
  const addEmoji = (e: any) => {
    if (PostContentRef.current) {
      PostContentRef.current.value += e.native
    }
  }
  // search friends component
  const [tagsShown, setTagsShown] = useState<Boolean>(false)
  // slected friends
  const [tags, setTags] = useState<
    Array<{
      fullName: string
      id: string
    }>
  >([])
  // blob urls for selected images/vedios
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
  const handleFormSubmit = async () => {
    if (
      PostContentRef.current?.value.trim() !== '' ||
      filesRef.current?.files?.length !== 0
    ) {
      const post = {
        tags: tags.map((tag) => tag.id) || [],
        content: PostContentRef.current!.value || '',
        files: filesRef.current!.files || [],
      }
      const formData = new FormData()
      formData.append('content', post.content)
      for (let i = 0; i < post.tags.length; i++) {
        formData.append('tags', post.tags[i])
      }
      for (let i = 0; i < post.files.length; i++) {
        formData.append('files', post.files[i])
      }
      const { data } = await axios.post(
        serverUrl + '/api/posts/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (data.succes) {
        toast.success('post created succesfully !')
        setTags([])
        setPreviews([])
        if (PostContentRef.current) {
          PostContentRef.current.value = ''
        }
        if (filesRef.current) {
          filesRef.current.value = ''
        }
      }
      try {
      } catch (error: any) {
        toast.info(error.message)
      }
    } else {
      toast.info('You cant post and empty post')
    }
  }
  useEffect(() => {
    AnimateFunction()
  }, [isPostFormOpen])
  return (
    <div className="relative">
      {pickerShown && (
        <PostEmogies addEmoji={addEmoji} setPickerShown={setPickerShown} />
      )}
      {tagsShown && (
        <PostSearchFriendsForTag
          setTagsShown={setTagsShown}
          tags={tags}
          setTags={setTags}
        />
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

          {previews.length > 0 && <PostFilesPreview previews={previews} />}

          {tags.length > 0 && <PostTagsPreview setTags={setTags} tags={tags} />}

          <Box
            sx={{
              mt: 1,
              p: 1,
              px: 2,
              outline: '1px solid grey',
              boxShadow: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1 className="font-bold text-sm text-[#272838] capitalize text-left ">
              Add to your post
            </h1>
            <div className="flex justify-end gap-2">
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
                    ref={filesRef}
                  />
                </label>
              </Tooltip>
              <Tooltip title="tags">
                <IconButton component="span" onClick={() => setTagsShown(true)}>
                  <i className="fa-solid fa-user-tag"></i>
                </IconButton>
              </Tooltip>
            </div>
            <Button
              variant="contained"
              size="medium"
              onClick={handleFormSubmit}
            >
              Post
            </Button>
          </Box>
        </Box>
      </motion.div>
    </div>
  )
}
