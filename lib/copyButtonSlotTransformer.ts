import type { ShikiTransformer } from 'shiki'

export function copyButtonSlotTransformer(): ShikiTransformer {
  return {
    name: '@elliot00/transformers/copy-button',
    code(node) {
      node.children.push({
        type: 'element',
        tagName: 'button',
        properties: {
          type: 'button',
          data: this.source,
          class: 'rehype-pretty-copy',
        },
        children: [
          {
            type: 'text',
            value: 'copy',
          },
        ],
      })
    },
  }
}
