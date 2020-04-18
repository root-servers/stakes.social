import React from 'react'
import { Button } from 'antd'

interface Props {
  propertyAddress: string
}

export const PropertyHeader = ({ propertyAddress }: Props) => {
  return (
    <div
      style={{
        position: 'relative',
        height: '562px',
        padding: '50px',
        background: 'linear-gradient(111.32deg, #2F80ED 0%, #D5E6FB 100%)'
      }}
    >
      <h1 style={{ display: 'inline', color: 'white', fontSize: '48px', lineHeight: '64px' }}>App Name</h1>
      <Button size="large" style={{ float: 'right' }}>
        Connect to a wallet
      </Button>
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          padding: '0 0 122px 333px',
          display: 'block'
        }}
      >
        <div style={{ background: 'white' }}>Property Address</div>
        <div style={{ background: 'white' }}>{propertyAddress}</div>
      </div>
    </div>
  )
}