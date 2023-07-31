import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

interface Props {
  addEmoji: (e: any) => void
  setPickerShown: React.Dispatch<React.SetStateAction<Boolean>>
}

export const PostEmogies = ({ addEmoji, setPickerShown }: Props) => {
  return (
    <div className="bg-white z-50 absolute top-[-10rem] right-14 outline outline-1 rounded-md PostsEmogiContainer">
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
  )
}
