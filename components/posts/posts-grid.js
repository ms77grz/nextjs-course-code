import PostItem from './post-item';
import classes from './post-grid.module.css';

export default function PostsGrid(props) {
  const { posts } = props;
  return (
    <ul className={classes.grid}>
      {posts.map(post => (
        <PostItem />
      ))}
    </ul>
  );
}
