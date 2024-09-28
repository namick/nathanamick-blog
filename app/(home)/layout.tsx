import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>home layout</div>
      {children}
    </div>
  )
}
