import EventSummary from '../../../components/event-detail/event-summary'
import EventLogistics from '../../../components/event-detail/event-logistics'
import EventContent from '../../../components/event-detail/event-content'
import Button from "../../../components/ui/button"
import ErrorAlert from  "../../../components/ui/error-alert/error-alert"
import fetchData from "../../../helpers/fetchData"
import transformData from "../../../helpers/transformData"

export default function EventPage({eventById}) {
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

export async function getStaticProps({ params }) {
    const eventId = params.id

    const data = await fetchData()

    const events = transformData(data);

    const event = events.find(el => el.id === eventId)

    if (!event) {
        return { notFound: true };
      }

    return {
        props: {
            eventById: event
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    const data = await fetchData()
    const events = transformData(data);

    const ids = events.map((el) => el.id);
    const pathsWithParams = ids.map((id) => ({ params: { id } }));

    return {
        paths: pathsWithParams,
        fallback: false,
      };
}