import { useRouter } from 'next/router';

import EventsList from '../../components/events/events-list';
import EventsSearchBox from '../../components/events/events-search';
import transformData from '../../helpers/transformData'
import fetchData from '../../helpers/fetchData';


export default function EventsPage(props) {
    const router = useRouter()
  
    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
        
    }

    return <div>
        <EventsSearchBox onSearch={findEventsHandler}/>
        <EventsList items={props.events} /> 
    </div>
}

export async function getStaticProps() {
   const data = await fetchData()

   const events = transformData(data)

    return {
        props: {
            events: events
        },
        revalidate: 10
    }
}
