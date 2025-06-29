// Utility to detect if a given URL is a Shopify-based site
import axios from "axios";

/**
 * Checks if a website is powered by Shopify by inspecting headers and HTML content
 * @param url The base URL of the site to check
 * @returns true if the site is Shopify-based, false otherwise
 */
export async function isShopifySite(url: string): Promise<boolean> {
  try {
    const res = await axios.get(url);
    // Shopify sites often have specific headers or reference Shopify CDN in HTML
    const powered = res.headers['x-shopid'] || res.headers['x-request-id'] || '';
    const html = res.data.toString().toLowerCase();
    return powered.includes('shopify') || html.includes('cdn.shopify.com');
  } catch {
    // If the request fails, assume it's not a Shopify site
    return false;
  }
}
