import { Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import { profile } from '../../pages/Profile/ProfileContent'
interface Props {
  profile?: profile
}
export const About = ({ profile }: Props) => {
  return (
    <Box sx={{ textAlign: 'left' }}>
      <h2 className="font-bold text-xl text-[#272838] ">Bio</h2>
      <h3 className="text-center">If you’re going through hell, keep going</h3>
      <hr className="w-[100%] m-2 text-[#272838]" />
      <h2 className="font-bold text-xl text-[#272838] ">City</h2>
      <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
        <HomeIcon fontSize="medium" /> Lives In{' '}
        <span className="font-bold">Rabat, Morocco</span>
      </h2>
      <h2 className="font-bold text-xl text-[#272838] ">Work</h2>
      <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
        <WorkIcon fontSize="medium" />{' '}
        {profile?.Work ? (
          <>
            Works at <span className="font-bold">{profile?.Work}</span>
          </>
        ) : (
          'No workplaces to show'
        )}
      </h2>
      <h2 className="font-bold text-xl text-[#272838] ">College</h2>

      <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
        <SchoolIcon fontSize="medium" />{' '}
        {profile?.Work ? (
          <>
            Studies at <span className="font-bold">{profile?.College}</span>
          </>
        ) : (
          'No schools to show'
        )}
      </h2>

      <h2 className="font-bold text-xl text-[#272838]">High school</h2>

      <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
        <SchoolIcon fontSize="medium" />{' '}
        {profile?.Work ? (
          <>
            Studies at <span className="font-bold">{profile?.HighSchool}</span>
          </>
        ) : (
          'No schools to show'
        )}
      </h2>
    </Box>
  )
}
