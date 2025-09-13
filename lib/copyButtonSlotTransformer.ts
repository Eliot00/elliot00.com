import type { ShikiTransformer } from 'shiki'

export const COPY_BUTTON_ID = 'shiki-copy'

export function copyButtonSlotTransformer(): ShikiTransformer {
  return {
    name: '@elliot00/transformers/copy-button',
    pre(node) {
      return {
        type: 'element',
        tagName: 'figure',
        properties: {
          className: 'relative',
        },
        children: [
          node,
          {
            type: 'element',
            tagName: 'button',
            properties: {
              type: 'button',
              data: this.source,
              buttonId: COPY_BUTTON_ID,
            },
            children: [],
          },
        ],
      }
    },
  }
}
