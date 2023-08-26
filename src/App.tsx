import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import CrosswordApp from './components/Crossword';

const Page = styled.div`
  padding: 2em;
`;

const Title = styled.h1`
`;

const SubTitle = styled.h3`
  color: grey;
`;

const Line = styled.div`
  margin-left: 2em;
  width: 50em;
  border-bottom: 1px solid black;
  position: absolute;
`;

function App() {
  // const crosswordProvider = useRef<CrosswordProviderImperative>(null);


  return (
    <Page>
      <div style={{ display: 'flex', alignItems: 'center', width: '52em', height: '3.5em' }}>
        <Title style={{ flex: '1', marginLeft: '1em' }}>Cryptic Mini</Title>
        <SubTitle style={{ flex: '1', textAlign: 'right' }}>26/08/2023</SubTitle>
      </div>
      <Line></Line>
      <CrosswordApp />
    </Page>
  )
}

export default App;


