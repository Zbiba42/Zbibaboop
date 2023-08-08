import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

interface Props {
  previews: {
    type: string
    url: string
  }[]
}

export const PostFilesPrev = ({ previews }: Props) => {
  const [open, setOpen] = useState(false)
  const [currentFile, setCurrentFile] = useState(0)
  const handleNext = () => {
    if (currentFile < previews.length - 1) {
      setCurrentFile((old) => old + 1)
    } else {
      setCurrentFile(0)
    }
  }

  const handlePrev = () => {
    if (currentFile > 0) {
      setCurrentFile((old) => old - 1)
    } else {
      setCurrentFile(previews.length - 1)
    }
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <div onClick={handleClickOpen}>
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
                {index == 2 && previews.length - 5 > 0 && (
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
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        aria-labelledby="slider-title"
      >
        <DialogContent>
          <div
            x-data="imageSlider"
            className="relative mx-auto max-w-2xl overflow-hidden rounded-md bg-gray-100 p-2 sm:p-4"
          >
            <button
              className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
              onClick={handleNext}
            >
              <i className="fas fa-chevron-left text-2xl font-bold text-gray-500"></i>
            </button>

            <button
              className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
              onClick={handlePrev}
            >
              <i className="fas fa-chevron-right text-2xl font-bold text-gray-500"></i>
            </button>

            <div className="relative h-80 w-[30rem] flex justify-center items-center">
              {currentFile >= 0 && currentFile < previews.length && (
                <img
                  src={previews[currentFile].url}
                  alt="image"
                  className="h-full object-contain"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
