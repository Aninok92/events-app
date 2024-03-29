import NewsletterRegistration from '../components/input/newsletter-registration'
import EventsList from '../components/events/events-list'
import transformData from '../helpers/transformData'
import fetchData from '../helpers/fetchData'

export default function HomePage({ featuredEvents }) {
  return (
    <>
      <NewsletterRegistration />
      <EventsList items={featuredEvents} />
    </>
  )
}

export async function getStaticProps() {
  const data = await fetchData()
  const events = transformData(data)
  const featuredEvents = events.filter((el) => el.isFeatured)

  return {
    props: {
      featuredEvents,
    },
    revalidate: 10,
  }
}
