import marked from "marked"
import prismjs from "prismjs"

const renderer = new marked.Renderer()
renderer.code = function(code, lang, escaped) {
  code = this.options.highlight(code, lang);
  if (!lang) {
    return `<pre><code>${code}</code></pre>`;
  }

  var langClass = "language-" + lang;
  return `<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>`;
};

marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code, lang) {
        try {
            return prismjs.highlight(code, prismjs.languages[lang], lang);
        } catch {
            return code;
        }
    }
}); 

export default marked