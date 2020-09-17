import React from 'react'
import { Button, Col, Row, Form, Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
// import { useGetMarketFactoryCreateQuery } from '@dev/graphql'
import { useGetMarketInformation } from 'src/fixtures/github/hooks'

interface Props {
  onSubmitSearchProperty: (word: string, market?: string) => void
}

const formLayout = {
  wrapperCol: { span: 24 }
}

const MarketSelectFormItem = ({ marketAddress }: { marketAddress: string }) => {
  const { data } = useGetMarketInformation(marketAddress)
  return data && data.name ? <span>{data.name}</span> : <></>
}

const MarketSelectForm = () => {
  // TODO: use valid market list via other data source
  // const { data } = useGetMarketFactoryCreateQuery()
  const data = {
    market_factory_create: [
      { market: '0x88c7B1f41DdE50efFc25541a2E0769B887eB2ee7' },
      { market: '0x34A7AdC94C4D41C3e3469F98033B372cB2fAf318' }
    ]
  }
  return (
    <Form.Item name="market" label="market">
      <Select placeholder="Select a market" allowClear>
        {data?.market_factory_create.map(({ market }: { market: string }) => (
          <Select.Option key={market} value={market}>
            <MarketSelectFormItem marketAddress={market} />
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}

export const PropertySearchForm = ({ onSubmitSearchProperty }: Props) => {
  return (
    <>
      <Form {...formLayout} onFinish={({ searchWord, market }) => onSubmitSearchProperty(searchWord, market)}>
        <Row>
          <Col sm={11} md={8}>
            <MarketSelectForm />
          </Col>
          <Col sm={1} md={1}></Col>
          <Col sm={11} md={8}>
            <Form.Item name="searchWord">
              <Input placeholder="input property search word" style={{ maxWidth: '90%' }} />
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
          </Col>
        </Row>
      </Form>
    </>
  )
}
