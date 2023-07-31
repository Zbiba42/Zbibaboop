interface Props {
  previews: {
    type: string
    url: string
  }[]
}

export const PostFilesPreview = ({ previews }: Props) => {
  return (
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
    </>
  )
}
