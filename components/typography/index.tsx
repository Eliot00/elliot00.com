import CustomLink from './CustomLink'
import { Heading2, Heading3, Heading4, Heading5, Heading6 } from './Heading'
import Blockquote from './Blockquote'
import Code from './Code'

const components = {
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  a: CustomLink,
  blockquote: Blockquote,
  code: Code,
}

export default components
