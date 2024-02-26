import { useRouter } from 'next/router';

import EventsList from '../../components/events/events-list';
import EventsSearchBox from '../../components/events/events-search';
import { getAllEvents } from '../../dummy-data'

function EventsPage() {
    const router = useRouter()
    const events = getAllEvents();

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
        
    }



    return <div>
        <EventsSearchBox onSearch={findEventsHandler}/>
        <EventsList items={events} />
    </div>
}

export default EventsPage