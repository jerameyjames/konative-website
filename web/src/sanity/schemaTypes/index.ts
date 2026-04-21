import type { SchemaTypeDefinition } from "sanity";

import { deal } from "./deal";
import { ingestionRun } from "./ingestionRun";
import { marketIntelPost } from "./marketIntelPost";
import { navigation } from "./navigation";
import { newsItem } from "./newsItem";
import { newsSource } from "./newsSource";
import { page } from "./page";
import { seoDefaults } from "./seoDefaults";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";
import { theme } from "./theme";

export const schemaTypes: SchemaTypeDefinition[] = [
  page,
  newsSource,
  newsItem,
  ingestionRun,
  marketIntelPost,
  service,
  testimonial,
  teamMember,
  deal,
  siteSettings,
  navigation,
  theme,
  seoDefaults,
];
