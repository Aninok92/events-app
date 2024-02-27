export default async function fetchData() {
  const response = await fetch(
    'https://events-app-43d36-default-rtdb.europe-west1.firebasedatabase.app/events.json',
  )
  const data = await response.json()

  return data
}
