import { Layout, Typography } from 'antd'

const { Footer } = Layout
const { Text } = Typography

export default function BlogFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Text>©{new Date().getFullYear()} My SSR Blog. All rights reserved.</Text>
    </Footer>
  )
}
