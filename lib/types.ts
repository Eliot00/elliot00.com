import type { FunctionComponent, PropsWithChildren } from 'react'

export type FCWithChildren<P = unknown> = FunctionComponent<
  PropsWithChildren<P>
>
