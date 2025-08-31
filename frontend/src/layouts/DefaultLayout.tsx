import { Suspense, type ReactNode } from "react"

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<div />}>
      {children}
    </Suspense>
  )
}

export default DefaultLayout
