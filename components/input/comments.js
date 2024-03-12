import { useContext, useEffect, useState } from 'react'

import NotificationContext from '../../store/notification-context'
import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments({ eventId }) {
  const [commentData, setCommentData] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [isFetchingComments, setIsFetchingComments] = useState(false)

  const { showNotification } = useContext(NotificationContext)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true)
      fetch(`/api/comment/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setCommentData(data.comment)
          setIsFetchingComments(false)
        })
    }
  }, [showComments])

  function addCommentHandler(commentData) {
    showNotification({
      title: 'Signing up...',
      message: 'Registering for new comment',
      status: 'pending',
    })

    fetch(`/api/comment/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
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
          message: 'Successfully add new comment',
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
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList commentData={commentData} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  )
}

export default Comments
