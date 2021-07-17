import PostHeader from './post-header';
import DUMMY_POSTS from '../../../data/dummy-posts';
import classes from './post-content.module.css';

const [DUMMY_POST] = DUMMY_POSTS;
DUMMY_POST.content = '# This is a first post';

export default function PostContent() {
  const { title, image, slug, content } = DUMMY_POST;

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      {content}
    </article>
  );
}
