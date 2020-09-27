import styled from 'styled-components'

// Components
import About from './about'
import Projects from './projects'

const BodyContainer = styled.div`
   padding: 12px;
   font-family: Quicksand, sans-serif;

   h1,
   p,
   .tags {
      max-width: 580px;
   }
`

const Body = () => (
   <BodyContainer>
      {/* <About /> */}
      <Projects />
   </BodyContainer>
)

export default Body
