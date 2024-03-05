import classes from './comment-list.module.css';

function CommentList({commentData}) {
  return (
   commentData.length > 0 && commentData.map(el => {
      return <ul className={classes.comments}>
      <li>
        <p>{el.text}</p>
        <div>
          By <address>{el.name}</address>
        </div>
      </li>
    </ul>
    })
  );
}


export default CommentList;

