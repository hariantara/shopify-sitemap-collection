#!/usr/bin/env node
// test.ts
import { getSitemapUrls } from './index.js';

(async () => {
  try {
    const result = await getSitemapUrls('https://www.allbirds.com');
    console.log("\n✅ Discovered URLs:");
    console.log(`  Products:    ${result.products.length}`);
    console.log(`  Collections: ${result.collections.length}`);
    console.log(`  Pages:       ${result.pages.length}`);
    console.log(`  Blogs:       ${result.blogs.length}`);
  } catch (err) {
    console.error("❌ Error running sitemap discovery:", err);
    process.exit(1);
  }
})();
