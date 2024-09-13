import SmartImage from './SmartImage'
import StyledTable from './StyledTable'
import CopyCodeButton from './CopyCodeButton'

const components: any = {
  img: SmartImage,
  table: StyledTable,
  button(props: any) {
    const { children, className, ...rest } = props

    if (className === 'rehype-pretty-copy') {
      return <CopyCodeButton code={rest.data} />
    } else {
      return <button {...props} />
    }
  },
}

export default components
