import { useRouter } from "next/router"

import { getFilteredEvents } from "../../../dummy-data"
import EventsList from "../../../components/events/events-list"
import ResultsTitle from "../../../components/events/results-title/results-title"
import ErrorAlert from "../../../components/ui/error-alert/error-alert"
import Button from "../../../components/ui/button"

export default function FilteredEvents() {
    const router = useRouter()

    const filteredData = router.query.slug

    if(!filteredData) {
        return <p className="center">Loading...</p>
    }

    const numYear = +filteredData[0]
    const numMonth = +filteredData[1]

    if(isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 || 
        numYear < 2020 || 
        numMonth < 1 || 
        numMonth > 12) {
        return (
            <>
                <ErrorAlert>
                    <p className="center">Not valid data...</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p className="center">No filtered events...</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all events</Button>
                </div>
            </>
        )
    }

    const date = new Date(numYear, numMonth)

    return (
        <>
            <ResultsTitle date={date}/>
            <EventsList items={filteredEvents} />
        </>
    )
}