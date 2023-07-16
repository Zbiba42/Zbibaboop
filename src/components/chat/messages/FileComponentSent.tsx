import { serverUrl } from '../../../config'

interface Props {
  files: Array<{ name: string; path: string }>
  isFirst: boolean
}
export const FileComponentSent = ({ files, isFirst }: Props) => {
  return (
    <>
      <span
        className={
          isFirst
            ? 'p-1 rounded-lg inline-block rounded-lg-none bg-blue-500'
            : 'p-1 rounded-lg inline-block rounded-tr-none bg-blue-500'
        }
      >
        {files.map((file) => {
          return (
            <>
              {file.path.toLowerCase().endsWith('.jpg') ||
              file.path.toLowerCase().endsWith('.jpeg') ||
              file.path.toLowerCase().endsWith('.png') ? (
                <img
                  className="m-1 w-28 h-28 float-left object-cover rounded-lg"
                  src={serverUrl + '/' + file.path}
                  alt="File"
                />
              ) : null}

              {file.path.toLowerCase().endsWith('.mp4') ||
              file.path.toLowerCase().endsWith('.webm') ||
              file.path.toLowerCase().endsWith('.ogg') ? (
                <video controls className="w-52">
                  <source src={serverUrl + '/' + file.path} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}

              {file.path.toLowerCase().endsWith('.mp3') ||
              file.path.toLowerCase().endsWith('.wav') ||
              file.path.toLowerCase().endsWith('.ogg') ? (
                <audio controls className="w-52">
                  <source src={serverUrl + '/' + file.path} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              ) : null}

              {!file.path.toLowerCase().endsWith('.jpg') &&
              !file.path.toLowerCase().endsWith('.jpeg') &&
              !file.path.toLowerCase().endsWith('.png') &&
              !file.path.toLowerCase().endsWith('.mp4') &&
              !file.path.toLowerCase().endsWith('.webm') &&
              !file.path.toLowerCase().endsWith('.ogg') &&
              !file.path.toLowerCase().endsWith('.mp3') &&
              !file.path.toLowerCase().endsWith('.wav') ? (
                <a
                  href={serverUrl + '/' + file.path}
                  download
                  className="inline-block px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition duration-300 ease-in-out rounded-md shadow-lg w-52"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="-ml-1 mr-2 h-5 w-5 text-white transform rotate-180 float-left"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 20h4a1 1 0 0 0 1-1v-6h5l-8-8-8 8h5v6a1 1 0 0 0 1 1z"
                    />
                  </svg>
                  <h3 className="float-left w-10/12 overflow-hidden text-ellipsis">
                    {file.name}
                  </h3>
                </a>
              ) : null}
            </>
          )
        })}
      </span>
    </>
  )
}
