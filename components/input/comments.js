import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [commentData, setCommentData] = useState([])

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

 useEffect(() => {
  fetch(`/api/comment/${eventId}`)
  .then((response) => response.json())
  .then((data) => {
    setCommentData(data.comment);
    console.log('data', data.comment);
  })
  
 }, [])

  function addCommentHandler(commentData) {
    fetch(`/api/comment/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => res.json()).then((data) => console.log(data))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList commentData={commentData} />}
    </section>
  );
}

export default Comments;