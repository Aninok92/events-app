import classes from './comment-list.module.css';

function CommentList({commentData}) {
  return (
<ul className={classes.comments}>
  { commentData.length > 0 && commentData.map(el => (
     <li key={el._id}>
        <p>{el.text}</p>
        <div>
          By <address>{el.name}</address>
        </div>
      </li>  
    ))}
     </ul>
  );
}


export default CommentList;

