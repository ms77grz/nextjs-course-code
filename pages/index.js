import { Fragment } from 'react';
import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';

export default function HomePage() {
  const DUMMY_POSTS = [
    {
      title: 'Getting Started with NextJS',
      image: 'getting-started-nextjs.png',
      excerpt:
        'NextJS is a the React framework for production – it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
      date: '2021-07-03',
      slug: 'getting-started-with-nextjs-1',
    },
    {
      title: 'Getting Started with NextJS',
      image: 'getting-started-nextjs.png',
      excerpt:
        'NextJS is a the React framework for production – it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
      date: '2021-07-03',
      slug: 'getting-started-with-nextjs-2',
    },
    {
      title: 'Getting Started with NextJS',
      image: 'getting-started-nextjs.png',
      excerpt:
        'NextJS is a the React framework for production – it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
      date: '2021-07-03',
      slug: 'getting-started-with-nextjs-3',
    },
    {
      title: 'Getting Started with NextJS',
      image: 'getting-started-nextjs.png',
      excerpt:
        'NextJS is a the React framework for production – it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
      date: '2021-07-03',
      slug: 'getting-started-with-nextjs-4',
    },
  ];

  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
}
