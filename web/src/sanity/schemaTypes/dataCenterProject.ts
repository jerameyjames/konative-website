import { defineType, defineField } from 'sanity'

export const dataCenterProject = defineType({
  name: 'dataCenterProject',
  title: 'Data Center Project',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Project Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'operator', title: 'Operator / Developer', type: 'string' }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      validation: r => r.required(),
    }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'state', title: 'State / Province', type: 'string' }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: { list: ['US', 'CA'] },
      validation: r => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Operational', value: 'operational' },
          { title: 'Under Construction', value: 'construction' },
          { title: 'Announced / Proposed', value: 'announced' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'capacityMw', title: 'Capacity (MW)', type: 'number' }),
    defineField({ name: 'announcedDate', title: 'Announced Date', type: 'date' }),
    defineField({ name: 'expectedOnlineDate', title: 'Expected Online', type: 'date' }),
    defineField({
      name: 'source',
      title: 'Data Source',
      type: 'string',
      options: { list: ['osm', 'wikidata', 'news_extraction', 'ieso_queue', 'manual'] },
    }),
    defineField({ name: 'sourceId', title: 'Source ID', type: 'string', description: 'OSM ID, Wikidata QID, news article ID, etc.' }),
    defineField({ name: 'sourceUrl', title: 'Source URL', type: 'url' }),
    defineField({ name: 'extractionConfidence', title: 'Extraction Confidence', type: 'number', description: '0–1 from LLM extraction; 1.0 for OSM/Wikidata' }),
    defineField({ name: 'lastSeenAt', title: 'Last Seen At', type: 'datetime' }),
    defineField({ name: 'verified', title: 'Manually Verified', type: 'boolean', initialValue: false }),
    defineField({ name: 'extractedAt', title: 'Extraction Processed At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'operator' },
  },
})
