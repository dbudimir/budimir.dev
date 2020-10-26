import styled from 'styled-components'

// Components
import About from './about'
import Projects from './projects'

const BodyContainer = styled.div`
   padding: 12px;
   font-family: Quicksand, sans-serif;
   max-width: 96%;
   scroll-behavior: smooth;
`

const Body = ({ showHeader }) => (
   <BodyContainer>
      <Projects showHeader={showHeader} />
   </BodyContainer>
)

export default Body
