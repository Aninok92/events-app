import EventsList from '../../../components/events/events-list'
import ResultsTitle from '../../../components/events/results-title/results-title'
import ErrorAlert from '../../../components/ui/error-alert/error-alert'
import Button from '../../../components/ui/button'
import fetchData from '../../../helpers/fetchData'
import transformData from '../../../helpers/transformData'

export default function FilteredEvents({ filteredEvents, numYear, numMonth }) {
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p className="center">Not valid data...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    )
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className="center">No filtered events...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const data = await fetchData()

  const events = transformData(data)

  const filteredData = params.slug

  const numYear = +filteredData[0]
  const numMonth = +filteredData[1]

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    )
  })

  return {
    props: {
      filteredEvents,
      numYear,
      numMonth,
    },
  }
}
