import { createClient } from '@sanity/client'
const c = createClient({ projectId: 'zwk4buq7', dataset: 'production', apiVersion: '2024-01-01', useCdn: false })
const count = await c.fetch('count(*[_type=="dataCenterProject"])')
console.log('count:', count)
const sample = await c.fetch('*[_type=="dataCenterProject"][0]{_id,name,location,status}')
console.log('sample:', JSON.stringify(sample, null, 2))
