# Shopify Sitemap Collection

A utility to fetch and classify Shopify store sitemap URLs into products, collections, pages, and blogs.

## Features
- Detects if a site is Shopify-based
- Fetches and parses sitemap.xml
- Classifies URLs into products, collections, pages, and blogs

## Usage

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