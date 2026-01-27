'use client'


import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇦🇺' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  
  // Detect locale from pathname until intl is properly configured
  const locale = pathname.startsWith('/bn') ? 'bn' : 'en'
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname if it exists
    let newPathname = pathname
    if (pathname.startsWith(`/${locale}`)) {
      newPathname = pathname.slice(`/${locale}`.length) || '/'
    }
    
    // Always add locale prefix for both en and bn
    const finalPath = `/${newLocale}${newPathname}`
    
    router.push(finalPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span>{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={`${
              language.code === locale ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
