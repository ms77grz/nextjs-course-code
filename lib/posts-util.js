import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostData(postIdenifier) {
  const postSlug = postIdenifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getPostFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getAllPosts() {
  const postFiles = getPostFiles();

  const allPosts = postFiles
    .map(postFile => getPostData(postFile))
    .sort((postA, postB) => postA.date - postB.date);

  return allPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}
