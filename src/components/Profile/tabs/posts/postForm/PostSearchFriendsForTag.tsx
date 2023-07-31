import { SearchTags } from './SearchTags'

interface Props {
  setTagsShown: React.Dispatch<React.SetStateAction<Boolean>>
  tags: {
    fullName: string
    id: string
  }[]
  setTags: React.Dispatch<
    React.SetStateAction<
      {
        fullName: string
        id: string
      }[]
    >
  >
}

export const PostSearchFriendsForTag = ({
  setTagsShown,
  setTags,
  tags,
}: Props) => {
  return (
    <div className="bg-white z-50 absolute bottom-[4.3rem] right-28 outline outline-1 rounded-lg ">
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
      <SearchTags setTagsShown={setTagsShown} setTags={setTags} tags={tags} />
    </div>
  )
}
