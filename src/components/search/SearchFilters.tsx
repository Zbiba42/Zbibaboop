import { Typography } from '@mui/material'
import FeedIcon from '@mui/icons-material/Feed'
interface props {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}
export const SearchFilters = ({ filter, setFilter }: props) => {
  const filters = [
    { name: 'People', icon: 'fa-solid fa-user-group' },
    { name: 'Posts', icon: 'fa-regular fa-newspaper' },
  ]
  return (
    <div className="fixed top-0 h-[100vh] text-start w-64 bg-[#f9f9f9] pt-2 border-r">
      <Typography
        component={'h1'}
        sx={{
          fontWeight: 700,
          fontSize: '1.2em',
          borderBottom: 1,
          padding: 1,
        }}
      >
        Search Results
      </Typography>
      <Typography
        component={'h1'}
        sx={{
          fontWeight: 700,
          fontSize: '1em',
          margin: 2,
        }}
      >
        Filters
      </Typography>
      <div className="w-[100%] h-[100%] p-1">
        {filters.map((link) => {
          return (
            <div
              className={
                filter == link.name.toString()
                  ? 'bg-[#e5e5dc] w-[100%] h-10 border flex items-center mb-1 rounded-md p-2 hover:bg-[#e5e5dc] cursor-pointer'
                  : 'w-[100%] h-10 border flex items-center mb-1 rounded-md p-2 hover:bg-[#e5e5dc] cursor-pointer'
              }
              onClick={() => setFilter(link.name)}
            >
              <div className="bg-[#e5e5dc] rounded-full w-[30px] h-[30px] flex justify-center items-center">
                {link.name == 'Posts' ? (
                  <FeedIcon fontSize="small" />
                ) : (
                  <i className={link.icon + ' w-4 h-4'}></i>
                )}
              </div>
              <Typography
                component={'h3'}
                sx={{
                  fontWeight: 500,
                  fontSize: '1em',
                  margin: 2,
                  textTransform: 'capitalize',
                }}
              >
                {link.name}
              </Typography>
            </div>
          )
        })}
      </div>
    </div>
  )
}
