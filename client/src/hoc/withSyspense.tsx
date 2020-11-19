import React from "react"

export function withSyspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return <React.Suspense fallback={<div>loading...</div>}>
      <WrappedComponent {...props} />
    </React.Suspense>
  }
}