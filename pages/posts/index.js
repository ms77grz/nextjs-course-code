import DUMMY_POSTS from '../../data/dummy-posts';
import AllPosts from '../../components/posts/all-posts';

export default function AllPostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}
