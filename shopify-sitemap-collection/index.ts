// Main entry point for Shopify sitemap URL discovery and classification
// This module fetches a Shopify store's sitemap, parses it, and classifies URLs into products, collections, pages, and blogs.

import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { isShopifySite } from './src/utils/isShopify.js';
import { classifyUrls } from './src/utils/classifier.js';

/**
 * Fetch and classify all URLs from a Shopify store's sitemap.xml
 * @param baseUrl The base URL of the Shopify store (e.g., https://examplestore.com)
 * @returns An object containing arrays of product, collection, page, blog, and raw sitemap URLs
 */
export async function getSitemapUrls(baseUrl: string): Promise<{
  products: string[];
  collections: string[];
  pages: string[];
  blogs: string[];
  raw: string[];
}> {
  // Remove trailing slash for consistency
  const cleanBase = baseUrl.replace(/\/$/, '');
  const sitemapIndexUrl = `${cleanBase}/sitemap.xml`;
  const parser = new XMLParser();

  // Result object to accumulate discovered URLs
  const result: {
    products: string[];
    collections: string[];
    pages: string[];
    blogs: string[];
    raw: string[];
  } = {
    products: [],
    collections: [],
    pages: [],
    blogs: [],
    raw: []
  };

  // Check if the site is a Shopify store before proceeding
  const isShopify = await isShopifySite(cleanBase);
  if (!isShopify) throw new Error("Not a Shopify-based site");

  // Fetch the main sitemap index
  const indexXml = await axios.get(sitemapIndexUrl);
  const indexJson = parser.parse(indexXml.data);

  // Extract all sub-sitemap URLs from the index
  const sitemapUrls = (indexJson.sitemapindex?.sitemap || []).map((s: any) => s.loc);
  result.raw.push(...sitemapUrls);

  // For each sub-sitemap, fetch and classify its URLs
  for (const sitemapUrl of sitemapUrls) {
    try {
      const subXml = await axios.get(sitemapUrl);
      const subJson = parser.parse(subXml.data);
      const urls = (subJson.urlset?.url || []).map((u: any) => u.loc);

      // Classify URLs into products, collections, pages, and blogs
      const { products, collections, pages, blogs } = classifyUrls(urls);
      result.products.push(...products);
      result.collections.push(...collections);
      result.pages.push(...pages);
      result.blogs.push(...blogs);
    } catch (e) {
      // Log and skip any sub-sitemaps that fail to fetch or parse
      console.warn(`Failed to fetch ${sitemapUrl}`);
    }
  }

  return result;
}
