import type { Metadata } from 'next'
import MapPageClient from './MapPageClient'

export const metadata: Metadata = {
  title: 'Data Center Map | Konative',
  description: 'Live interactive map of 900+ data center projects across the US and Canada — operational, under construction, and announced. Updated daily.',
}

export default function MapPage() {
  return <MapPageClient />
}
