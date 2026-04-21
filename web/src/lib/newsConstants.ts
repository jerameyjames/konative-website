/** Shared news filter metadata (formerly Payload `NewsSources` constants). */

export const NEWS_SOURCE_COUNTRY_OPTIONS = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
] as const;

export const NEWS_TOPIC_OPTIONS = [
  { label: "Data Center Construction", value: "construction" },
  { label: "Permitting and Zoning", value: "permitting" },
  { label: "Rules and Regulations", value: "regulations" },
  { label: "Capital Spend and Investment", value: "investment" },
  { label: "Utility and Power", value: "power" },
  { label: "Sustainability and Water", value: "sustainability" },
  { label: "Tax and Incentives", value: "tax" },
] as const;

export type NewsTopicValue = (typeof NEWS_TOPIC_OPTIONS)[number]["value"];

export function isNewsTopicValue(value: string): value is NewsTopicValue {
  return (NEWS_TOPIC_OPTIONS as readonly { value: string }[]).some((option) => option.value === value);
}
