import React from 'react'
import { Button, Col, Row, Form, Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useGetMarketFactoryCreateQuery } from '@dev/graphql'
import { useGetMarketInformation } from 'src/fixtures/github/hooks'

interface Props {
  onSubmitSearchProperty: (word: string, market?: string) => void
}

const formLayout = {
  wrapperCol: { span: 24 }
}

const MarketSelectFormItem = ({ marketAddress }: { marketAddress: string }) => {
  const { data } = useGetMarketInformation(marketAddress)
  return data ? <span>{data.name}</span> : <span>{marketAddress}</span>
}

const MarketSelectForm = () => {
  // TODO: use valid market list
  const { data } = useGetMarketFactoryCreateQuery()
  return (
    <Form.Item name="market" label="market">
      <Select placeholder="Select a market" allowClear>
        {data?.market_factory_create.map(({ market }) => (
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
