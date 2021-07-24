import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostFiles } from '../../lib/posts-util';
import { Fragment } from 'react';
import Head from 'next/head';

export default function PostDetailPage({ post }) {
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: { post: postData },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const postFiles = getPostFiles();
  const paths = postFiles.map(postFile => ({
    params: { slug: postFile.replace(/\.md$/, '') },
  }));

  return {
    paths,
    fallback: false,
  };
}
