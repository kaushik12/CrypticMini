import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
    CrosswordGrid,
    CrosswordProvider,
    CrosswordProviderImperative,
    DirectionClues,
} from '@jaredreisinger/react-crossword';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import { useStopwatch } from 'react-timer-hook';


const CrosswordProviderWrapper = styled.div`
  width: 95%;
//   min-width: 20em;
  padding: 2% 3.5%;
  display: flex;
  flex-wrap:wrap;
  @media (max-width:600px){
      justify-content:center;
  }

  
  gap: 10px;

  .direction {
    max-width: 275px;
    min-width: 275px;
    align-content:center;
    // size: 50%;

    .header {
      margin-top: 0;
      margin-bottom:2%;
    }
  }

  .grid {
    max-width: 250px;
    min-width: 200px;
    align-content:center;
  }
  
  .clue {
    padding: 2px;
  }
`;

const Commands = styled.div``;

const Command = styled.button`
  margin-top: 1em;
  margin-right: 1em;
`;

const data = {
    date: '07/09/2023',
    across: {
        1: {
            clue: 'Requests improperly for a part of flower',
            answer: 'SEPAL',
            row: 0,
            col: 0,
        },
        4: {
            clue: 'A cereal for a nut',
            answer: 'ACORN',
            row: 2,
            col: 0,
        },
        5: {
            clue: 'Demo jingle featuring an icon',
            answer: 'EMOJI',
            row: 4,
            col: 0,
        },
    },
    down: {
        1: {
            clue: 'What often has a heart beat?',
            answer: 'SPADE',
            row: 0,
            col: 0,
        },
        2: {
            clue: 'Publicity for a second',
            answer: 'PROMO',
            row: 0,
            col: 2,
        },
        3: {
            clue: 'Garment I found behind organ',
            answer: 'LUNGI',
            row: 0,
            col: 4,
        },
    },
}

function CrosswordApp() {
    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    const crosswordProvider = useRef<CrosswordProviderImperative>(null);

    useEffect(() => {
        if (crosswordProvider.current?.isCrosswordCorrect()) {
            pause();
        }
    }, [crosswordProvider.current])

    const resetProvider = useCallback<React.MouseEventHandler>((event) => {
        crosswordProvider.current?.reset();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', maxWidth: '52em' }}>
                <div style={{ flexGrow: '1', textAlign: 'left', marginLeft: '2em' }}>
                    <div style={{ fontSize: '18px', color: '#1e90ff', fontWeight: 'bold' }}>
                        <span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    onClick={() => {
                        crosswordProvider.current?.fillAllAnswers();
                        pause();
                    }}
                    color={'#1e90ff'}
                    size={"lg"}
                    className={'soln'}
                    style={{ display: 'flex', paddingLeft: '0.5em', paddingRight: '0.5em' }} />
                <FontAwesomeIcon
                    icon={faArrowsRotate}
                    onClick={() => {
                        crosswordProvider.current?.reset();
                        reset();
                    }}
                    color={'#1e90ff'}
                    size={"lg"}
                    className={'reset'}
                    style={{ display: 'flex', paddingLeft: '0.5em', paddingRight: '1em' }} />
                <Tooltip anchorSelect=".soln" content="Show solution" place="bottom" />
                <Tooltip anchorSelect=".reset" content="Reset grid" place="bottom" />
            </div>
            <CrosswordProviderWrapper>
                <CrosswordProvider ref={crosswordProvider} data={data}>
                    <CrosswordGrid />
                    <DirectionClues direction="across" />
                    <DirectionClues direction="down" />
                </CrosswordProvider>
            </CrosswordProviderWrapper>
        </div>
    )
}

export default CrosswordApp;


