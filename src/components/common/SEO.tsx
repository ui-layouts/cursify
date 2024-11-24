import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}

const SEO: React.FC<SEOProps> = ({
  title = 'Default Site Title',
  description = 'Default site description',
  keywords = ['default', 'keywords'],
  ogImage = '/default-og-image.png',
  canonicalUrl = window.location.href
}) => {
  return (
    <Helmet>
      {/* Page Title */}
      <title>{title}</title>
      <meta name="title" content={title} />
      
      {/* Description */}
      <meta name="description" content={description} />
      
      {/* Keywords */}
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  )
}

export default SEO