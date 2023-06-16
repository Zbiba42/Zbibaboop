import { SearchFilters } from '../components/search/SearchFilters'

export const Search = () => {
  return (
    <>
      <div
        style={{
          paddingLeft: '82px',
          height: '200vh',
          width: '100%',
          display: 'flex',
          paddingTop: '1.8rem',
        }}
      >
        <SearchFilters />
      </div>
    </>
  )
}
