import Head from 'next/head'

import styled from 'styled-components'

// Components
import Body from '../components/body/body.jsx'
import SideBar from '../components/sidebar.jsx'

const Layout = styled.div`
   display: flex;
`

const Index = () => {
   console.log('test')

   return (
      <div>
         <Head>
            <title>David Budimir</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <SideBar />
            <Body />
         </Layout>
      </div>
   )
}

export default Index
