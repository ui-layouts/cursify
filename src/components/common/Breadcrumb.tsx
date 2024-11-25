import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useLocation, Link } from 'react-router-dom'

const BreadcrumbMaker = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  const formatName = (name) => {
    return name
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .split(' ') // Split by space
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ') // Join back into a single string
  }

  return (
    <Breadcrumb className='px-6'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" >Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components" >Components</BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          return (
            <React.Fragment key={name}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={Link}
                  to={routeTo}
                  className={isLast ? "text-foreground" : ""}
                >
                  {formatName(name)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbMaker
