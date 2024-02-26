import { getFeaturedEvents } from "../dummy-data"
import EventsList from "../components/events/events-list"

function HomePage() {
    const featuredEvents = getFeaturedEvents()
    console.log(featuredEvents)
    return <>
        <EventsList items={featuredEvents} />
    </>
}

export default HomePage