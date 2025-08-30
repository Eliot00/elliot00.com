const formatCommand = 'prettier --write'

export default {
  '*.{js,jsx,ts,tsx}': [formatCommand, 'oxlint'],
  '*.css': [formatCommand],
}
