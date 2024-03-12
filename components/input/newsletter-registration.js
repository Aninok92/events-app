import { useRef, useContext } from 'react'

import classes from './newsletter-registration.module.css'
import NotificationContext from '../../store/notification-context'

function NewsletterRegistration() {
  const emailInputRef = useRef()

  const { showNotification } = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value

    const reqBody = { email: enteredEmail }

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending',
    })

    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }

        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then((data) => {
        showNotification({
          title: 'Success',
          message: 'Successfully registered for newsletter',
          status: 'success',
        })
      })
      .catch((err) => {
        showNotification({
          title: 'Error!',
          message: err.message || 'Something went wrong!',
          status: 'error',
        })
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
