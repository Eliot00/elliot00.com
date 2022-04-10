import React from 'react';

export const Heading2: React.FC = props => (
  <h2
    className="text-2xl leading-tight mt-6 mb-4 font-semibold font-serif border-l-4 pl-2 border-indigo-200"
    {...props}
  />
)

export const Heading3: React.FC = props => (
  <h3
    className="text-lg leading-snug mt-6 mb-4 font-semibold font-serif"
    {...props}
  />
)

export const Heading4: React.FC = props => (
  <h4
    className="leading-none text-base font-semibold mb-4 mt-6"
    {...props}
  />
)

export const Heading5: React.FC = props => (
  <h5
    className="leading-tight text-sm font-semibold mb-4 mt-6"
    {...props}
  />
)

export const Heading6: React.FC = props => (
  <h6
    className="leading-tight text-sm font-semibold text-gray-600 mb-4 mt-6"
    {...props}
  />
)
