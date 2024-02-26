import { useRouter } from "next/router"

import { getEventById } from '../../../dummy-data'
import EventSummary from '../../../components/event-detail/event-summary'
import EventLogistics from '../../../components/event-detail/event-logistics'
import EventContent from '../../../components/event-detail/event-content'
import Button from "../../../components/ui/button"

function EventPage() {
    const router = useRouter()
    const eventById = getEventById(router.query.id)
   
    if(!eventById) {
        return (
            <>
                <ErrorAlert>
                    <p className="center">No event found...</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all events</Button>
                </div>
            </>
        )
    }

    return (
        <>
            <EventSummary title={eventById.title} />
            <EventLogistics
                date={eventById.date}
                address={eventById.location}
                image={eventById.image}
                emageAlt={eventById.title}
            />
            <EventContent><p>{eventById.description}</p></EventContent>
        </>
    )
}

export default EventPage