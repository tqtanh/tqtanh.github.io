import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Published posts only (drafts excluded even in dev). Drives whether Writing appears in nav and on home.
export async function hasPublishedPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).length > 0;
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-NZ', { year: 'numeric', month: 'short', day: 'numeric' });
