import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import CrosswordApp from './components/Crossword';

const Page = styled.div`
  padding: 3%;
`;

const Title = styled.h1`
`;

const SubTitle = styled.h3`
  color: grey;
`;

const Line = styled.div`  
  border-bottom: 1px solid black;
  position: absolute;
`;

function App() {
  // const crosswordProvider = useRef<CrosswordProviderImperative>(null);


  return (
    <Page>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '850px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '2.5em' }}>
          <Title style={{ marginLeft: '1em', textAlign: 'left' }}>Cryptic Mini</Title>
          <SubTitle style={{ marginLeft: '1em', paddingRight: '1em', textAlign: 'right' }}>26/08/2023</SubTitle>
        </div>
        <hr style={{ display: 'block', margin: '0.5em 0', marginLeft: '2em', }}></hr>
        {/* <hr style={{ marginLeft: '2em', paddingRight: '2em', width: '100%', maxWidth: '850px', }}></hr> */}
      </div>

      <CrosswordApp />
    </Page>
  )
}

export default App;


