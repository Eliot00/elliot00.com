import CustomLink from './CustomLink'
import { Heading2, Heading3, Heading4, Heading5, Heading6 } from './Heading'
import Paragraph from './Paragraph'
import Blockquote from './Blockquote'

const components = {
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  a: CustomLink,
  blockquote: Blockquote,
  p: Paragraph,
}

export default components
