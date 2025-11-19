import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VueModaller',
  description: 'A flexible and powerful modal system for Vue 3 applications with TypeScript support',
  lang: 'en-US',
  base: '/vue-modaller/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.webp',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api-reference' },
      { text: 'Examples', link: '/examples/' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/getting-started#installation' },
          { text: 'Quick Start', link: '/guide/getting-started#basic-setup' }
        ]
      },
      {
        text: 'Guide',
        items: [
          { text: 'Modal Types', link: '/guide/modal-types' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Styling', link: '/guide/styling' },
          { text: 'Responsive Design', link: '/guide/responsive' },
          { text: 'Advanced Usage', link: '/guide/advanced' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'API Overview', link: '/api-reference' },
          { text: 'useModal', link: '/api-reference#usemodal' },
          { text: 'Components', link: '/api-reference#components' },
          { text: 'Types', link: '/api-reference#types' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Basic Examples', link: '/examples/' },
          { text: 'Advanced Examples', link: '/examples/advanced' },
          { text: 'Live Demo', link: 'https://classyrazy.github.io/vue-modaller/live-demo/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/classyrazy/vue-modaller' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/vue-modaller' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Classydev'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/classyrazy/vue-modaller/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
