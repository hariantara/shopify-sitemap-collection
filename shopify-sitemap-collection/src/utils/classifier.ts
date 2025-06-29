// Utility to classify Shopify sitemap URLs by type

/**
 * Classifies an array of URLs into Shopify resource types
 * @param urls Array of URLs from a sitemap
 * @returns Object with arrays for products, collections, pages, and blogs
 */
export function classifyUrls(urls: string[]) {
  const products: string[] = [];
  const collections: string[] = [];
  const pages: string[] = [];
  const blogs: string[] = [];

  for (const url of urls) {
    if (url.includes('/products/')) products.push(url);
    else if (url.includes('/collections/')) collections.push(url);
    else if (url.includes('/pages/')) pages.push(url);
    else if (url.includes('/blogs/')) blogs.push(url);
  }

  return { products, collections, pages, blogs };
}
