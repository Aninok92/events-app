import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import DateIcon from '../icons/date-icon'
import Button from '../ui/button'
import classes from './event-item.module.css'

export default function EventItem(props) {
    const { title, image, date, location, id } = props

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const formattedAdress = location.replace(', ', '\n');
    const exploreLink = `/events/${id}` 

    return <li className={classes.item}>
        <img src={'/' + image} alt={title} />
        <div className={classes.content}>
            <div className={classes.summary}>
                <h2>{title}</h2>
                <div className={classes.date}>
                    <DateIcon />
                    <time>{humanReadableDate}</time>
                </div>
                <div className={classes.address}>
                    <AddressIcon />
                    <address>{formattedAdress}</address>
                </div>
            </div>
            <div className={classes.actions}>
                
                <Button link={exploreLink}>
                    <span className={classes.icon}><ArrowRightIcon /></span>
                    <span>Explore Event</span>
                </Button>
            </div>
        </div>
    </li>
}