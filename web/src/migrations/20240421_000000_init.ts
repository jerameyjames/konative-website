import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-vercel-postgres";

export const name = "20240421_000000_init";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const adapter = payload.db as any;
  const { pushSchema } = adapter.requireDrizzleKit();
  const { apply, warnings } = await pushSchema(
    adapter.schema,
    adapter.drizzle,
    adapter.schemaName ? [adapter.schemaName] : undefined,
    adapter.tablesFilter
  );
  if (warnings.length > 0) {
    payload.logger.warn({ msg: `Schema push warnings: ${warnings.join("\n")}` });
  }
  await apply();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function down(_: MigrateDownArgs): Promise<void> {}
