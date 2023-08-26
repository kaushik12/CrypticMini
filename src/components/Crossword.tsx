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
    across: {
        1: {
            clue: 'Bachelor starts running a pub',
            answer: 'BAR',
            row: 0,
            col: 0,
        },
        4: {
            clue: 'Indian, say, rocking the canoe',
            answer: 'OCEAN',
            row: 1,
            col: 0,
        },
        7: {
            clue: 'Beret rouge exhibiting 70s style',
            answer: 'RETRO',
            row: 2,
            col: 0,
        },
        8: {
            clue: 'Online agreement?',
            answer: 'ESIGN',
            row: 3,
            col: 0,
        },
        9: {
            clue: 'Poet for the most part!',
            answer: 'POE',
            row: 4,
            col: 2,
        },
    },
    down: {
        1: {
            clue: 'Dull drill',
            answer: 'BORE',
            row: 0,
            col: 0,
        },
        2: {
            clue: 'Breezes through AA?',
            answer: 'ACES',
            row: 0,
            col: 1,
        },
        3: {
            clue: 'Note end to clue again',
            answer: 'RETIP',
            row: 0,
            col: 2,
        },
        5: {
            clue: 'Movie trimmed technical language',
            answer: 'ARGO',
            row: 1,
            col: 3,
        },
        6: {
            clue: 'Not a single person heard the sister',
            answer: 'NONE',
            row: 1,
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


