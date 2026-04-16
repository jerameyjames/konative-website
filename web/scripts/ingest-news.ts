import { getPayload } from "payload";

import config from "../payload.config";
import { runNewsIngestion } from "../src/lib/newsIngestion";

async function main() {
  const payload = await getPayload({ config });

  const summary = await runNewsIngestion(payload);

  for (const result of summary.results) {
    console.log(
      `[${result.sourceName}] status=${result.status} discovered=${result.discovered} created=${result.created} skipped=${result.skipped}`,
    );
    if (result.error) {
      console.log(`  error=${result.error}`);
    }
  }

  console.log(`Ingestion complete across ${summary.sourceCount} sources.`);
  console.log(`Totals: discovered=${summary.discovered} created=${summary.created} skipped=${summary.skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
