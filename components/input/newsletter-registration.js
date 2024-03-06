import { useRef } from 'react'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
  const emailInputRef = useRef()

  function registrationHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value

    const reqBody = { email: enteredEmail }

    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
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
