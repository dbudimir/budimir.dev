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
      max-width: 540px;
   }
`

const Body = () => {
   console.log('test')

   return (
      <BodyContainer>
         <h1>David Budimir</h1>
         <About />
         <Projects />
      </BodyContainer>
   )
}

export default Body
