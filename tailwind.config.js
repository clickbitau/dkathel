/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Logo-inspired monochromatic color scheme
        logo: {
          black: '#000000',
          charcoal: '#2F2F2F',
          darkGray: '#4A4A4A',
          mediumGray: '#6B6B6B',
          lightGray: '#9E9E9E',
          white: '#FFFFFF',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#2F2F2F', // Logo charcoal
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#6B6B6B', // Logo medium gray
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#9E9E9E', // Logo light gray
          foreground: '#2F2F2F',
        },
        accent: {
          DEFAULT: '#4A4A4A', // Logo dark gray
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#2F2F2F',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2F2F2F',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['var(--font-anek-bangla)', 'sans-serif'],
        heading: ['var(--font-montserrat-alternates)', 'sans-serif'],
        mono: ['var(--font-mina)', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.dark'),
              },
            },
            h1: {
              fontFamily: theme('fontFamily.heading').join(','),
              fontWeight: '700',
            },
            h2: {
              fontFamily: theme('fontFamily.heading').join(','),
              fontWeight: '600',
            },
            h3: {
              fontFamily: theme('fontFamily.heading').join(','),
              fontWeight: '600',
            },
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.heading').join(','),
            },
            'p, ul, ol, li, a, button, input, textarea, select, label, span': {
              fontFamily: theme('fontFamily.sans').join(','),
            },
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
