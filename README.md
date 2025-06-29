# Shopify Sitemap Collection

A utility to fetch and classify Shopify store sitemap URLs into products, collections, pages, and blogs.

## Features
- Detects if a site is Shopify-based
- Fetches and parses sitemap.xml
- Classifies URLs into products, collections, pages, and blogs

## Usage in Your Project

First, install the package:

```bash
npm install shopify-sitemap-collection
```

Then, use it in your TypeScript or JavaScript project:

```ts
// ESM/TypeScript
import { getSitemapUrls } from 'shopify-sitemap-collection';

(async () => {
  const result = await getSitemapUrls('https://www.allbirds.com');
  console.log(result.products);      // Array of product URLs
  console.log(result.collections);   // Array of collection URLs
  console.log(result.pages);         // Array of page URLs
  console.log(result.blogs);         // Array of blog URLs
})();
```

> **Note:** If you are using CommonJS, you may need to use dynamic import:
> ```js
> const { getSitemapUrls } = await import('shopify-sitemap-collection');
> ```

## Usage for Development/Testing

### Prerequisites
- Node.js v18 or later
- npm

### Install dependencies
```bash
npm install
```

### Run the test script
```bash
npm test
```

Or directly:
```bash
node --loader ts-node/esm test.ts
```

## Project Structure
- `index.ts` - Main entry point and sitemap logic
- `src/utils/isShopify.ts` - Shopify site detection
- `src/utils/classifier.ts` - URL classifier
- `test.ts` - Example/test script

## License
MIT