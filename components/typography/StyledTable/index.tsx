import styles from './table.module.css'

export default function StyledTable(props: any) {
  return <table {...props} className={styles.table} />
}
