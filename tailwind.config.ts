
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"], // Ensure dark mode is class-based
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
        // Updated to use HSL variables from globals.css
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
        'ping-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.2)', opacity: '0.6' },
        },
        'pulse-border': { // For glowing borders
          '0%, 100%': { borderColor: 'hsl(var(--primary-DEFAULT)/0.5)' },
          '50%': { borderColor: 'hsl(var(--primary-DEFAULT)/1)' },
        },
        'pulse-border-bg': { // For background pulsing
          '0%, 100%': { backgroundColor: 'hsla(var(--destructive), 0.15)' },
          '50%': { backgroundColor: 'hsla(var(--destructive), 0.3)' },
         },
        'bounce-horizontal': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(15%)' }, // Reduced bounce
        },
        'neon-glow': {
          '0%, 100%': { textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary))', opacity: '0.8' },
          '50%': { textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))', opacity: '1'},
        },
        'scanline': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slideUp': {
          'from': { transform: 'translateY(20px)', opacity: '0'},
          'to': { transform: 'translateY(0)', opacity: '1'},
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'ping-slow': 'ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-border': 'pulse-border 2s infinite',
        'pulse-border-bg': 'pulse-border-bg 2s infinite',
        'bounce-horizontal': 'bounce-horizontal 1.5s infinite',
        'neon-glow': 'neon-glow 1.5s ease-in-out infinite alternate',
        'scanline': 'scanline 10s linear infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
  		},
      boxShadow: { // Custom shadows for glow effects
        'glow-primary-sm': '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary))',
        'glow-primary-md': '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))',
        'glow-accent-sm': '0 0 5px hsl(var(--accent)), 0 0 10px hsl(var(--accent))',
        'glow-accent-md': '0 0 10px hsl(var(--accent)), 0 0 20px hsl(var(--accent))',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
