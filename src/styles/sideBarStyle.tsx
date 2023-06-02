export const SideBarBox: object = {
  height: '100%',
  width: window.innerWidth * 0.06,
  minWidth: '82px',
  borderRight: `${1}px solid #D3D3D3`,
  position: 'fixed',
}

export const HomeButton: object = {
  width: '100%',
  height: '75px',
  borderBottom: '1px solid #D3D3D3',
  padding: 1,
  backgroundColor: '#0288d1',
  display: 'flex',
  justifyContent: 'center',
  justifyItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    color: 'white',
    backgroundColor: '#0288e9',
  },
  '&:hover img': {
    filter: 'invert(100%)',
  },
}

export const SideBarButton: object = {
  width: '100%',
  height: '75px',
  borderBottom: '1px solid #D3D3D3',
  padding: 1,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    color: 'white',
    backgroundColor: '#0288d1',
    transition: 'color 0.25s ease',
  },
}
