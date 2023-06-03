export let serverUrl: string

if (process.env.NODE_ENV === 'production') {
  serverUrl = 'soon'
} else {
  serverUrl = 'http://localhost:5000'
}
