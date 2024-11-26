import React from 'react'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocation, Link } from 'react-router-dom'

const BreadcrumbMaker = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  const formatName = (name: string) => {
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
          <BreadcrumbLink  to="/" as={Link}>Home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.length > 2 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {pathnames.slice(0, -2).map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
                    return (
                      <DropdownMenuItem key={name} asChild>
                        <Link to={routeTo}>{formatName(name)}</Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {pathnames.length >= 2 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink 
                as={Link} 
                to={`/${pathnames.slice(0, -1).join('/')}`}
              >
                {formatName(pathnames[pathnames.length - 2])}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {pathnames.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {formatName(pathnames[pathnames.length - 1])}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbMaker