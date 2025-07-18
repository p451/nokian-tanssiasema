/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Override Tailwind's default fonts completely
    fontFamily: {
      'heading': ['Montserrat Alternates', 'sans-serif'],
      'body': ['Manrope', 'sans-serif'],
      'sans': ['Manrope', 'sans-serif'], // Force all sans-serif to use your body font
      'serif': ['Montserrat Alternates', 'serif'], // Force all serif to use your heading font
      'mono': ['Manrope', 'monospace'], // Even mono uses your body font
    },
    
    // Override Tailwind's default font weights completely
    fontWeight: {
      'thin': '100',
      'extralight': '200', 
      'light': '250',
      'normal': '200',
      'medium': '300',
      'semibold': '400',
      'bold': '500',
      'extrabold': '600',
      'black': '700',
    },
    
    extend: {
      // Brand Colors - using CSS custom properties for consistency
      colors: {
        // Primary brand colors
        'accent-primary': 'var(--color-accent-primary)',
        'accent-primary-hover': 'var(--color-accent-primary-hover)',
        'neutral-primary': 'var(--color-neutral-primary)',
        'neutral-secondary': 'var(--color-neutral-secondary)',
        'neutral-inverse': 'var(--color-neutral-inverse)',
        'charcoal': 'var(--color-charcoal)',
        'sage': 'var(--color-sage)',
        
        // Legacy color names for backwards compatibility
        'accent': 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'dark': 'var(--color-dark)',
        'offWhite': 'var(--color-offWhite)',
        'blush': 'var(--color-blush)',
        
        // Color tints
        'accent-a90': 'var(--color-accent-a90)',
        'accent-a80': 'var(--color-accent-a80)',
        'accent-a70': 'var(--color-accent-a70)',
        
        // Status colors
        'error': 'var(--color-error)',
        'warning': 'var(--color-warning)',
        'success': 'var(--color-success)',
        'info': 'var(--color-info)',
      },
      
      // Font sizes - use CSS custom properties for consistency
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)',
        '8xl': 'var(--text-8xl)',
        '9xl': 'var(--text-9xl)',
      },
      
      // Spacing - use CSS custom properties for consistency
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
      },
      
      // Border radius - use CSS custom properties
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      
      // Box shadows - use CSS custom properties
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'base': 'var(--shadow-base)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      
      // Transitions - use CSS custom properties
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'normal': 'var(--transition-normal)',
        'slow': 'var(--transition-slow)',
      },
    },
  },
  plugins: [],
}