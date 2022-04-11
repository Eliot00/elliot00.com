import { marked } from 'marked'
import prismjs from 'prismjs'
import loadLanguages from 'prismjs/components/'

loadLanguages([
  'javascript',
  'jsx',
  'css',
  'markup',
  'bash',
  'json',
  'rust',
  'python',
  'typescript',
])

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  breaks: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    try {
      return prismjs.highlight(code, prismjs.languages[lang], lang)
    } catch {
      return code
    }
  },
})

export default marked
