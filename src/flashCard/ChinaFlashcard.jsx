import React, { useState, useEffect } from 'react';
import './Flashcard.css';
import '../App.css'


const ChinaFlashcard = ({ chinaNote, yesNoUpdate, userValified }) => {

    const [count, setCount] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [hitLimit, setHitLimit] = useState(false);
    const [arr, setArr] = useState([]);



    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        //remove event listener when component is mounted.
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [chinaNote, count, flipped, hitLimit]);

    useEffect(() => {
        setArr(sortedArray());
    }, []);


    const handleKeyPress = async (e) => {
        switch (e.key) {
            case 'ArrowUp':
                handleToggleFlip();
                break;
            case 'ArrowDown':
                handleToggleFlip();
                break;
            case 'ArrowRight':
                if (!hitLimit) {
                    nextCardFlipFalse();
                    if (userValified) {
                        await yesNoUpdate(arr[count], true, 'Chinese');
                    }
                    if (arr.length > count + 1) {
                        handleIncrement();
                    } else {
                        handlelimit();
                    }
                }
                break;
            case 'ArrowLeft':
                if (!hitLimit) {
                    nextCardFlipFalse();
                    if (userValified) {
                        await yesNoUpdate(arr[count], false, 'Chinese');
                    }
                    if (arr.length > count + 1) {
                        handleIncrement();
                    } else {
                        handlelimit();
                    }
                }
                break;
            default:
                break;
        }
    };

    const handleIncrement = () => {
        setCount((prevCount) => prevCount + 1);
    }

    const sortedArray = () => {
        let newArray = chinaNote.filter(item => item.status === 'notLearnt');

        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        return newArray;
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleToggleFlip = () => {
        setFlipped((prevFlipped) => !prevFlipped);
    }

    const handlelimit = () => {
        setHitLimit((prevhitLimit) => !prevhitLimit);
    }

    const flashcardContent = arr[count];

    const restart = () => {
        setCount(0);
        setFlipped(false);
        setHitLimit(false);
    }

    const manualClick = async (move) => {

        if (move === 'no') {
            if (!hitLimit) {
                nextCardFlipFalse();
                if (userValified) {
                    await yesNoUpdate(arr[count], false, 'Chinese');
                }
                if (arr.length > count + 1) {
                    handleIncrement();
                } else {
                    handlelimit();
                }
            }
        }
        if (move === 'yes') {
            if (!hitLimit) {
                nextCardFlipFalse();
                if (userValified) {
                    await yesNoUpdate(arr[count], true, 'Chinese');//
                }
                if (arr.length > count + 1) {
                    handleIncrement();
                } else {
                    handlelimit();
                }
            }
        }
        if (move === 'flip') {
            handleToggleFlip();
        }
    }





    return (
        <div className='flashcard-container'>

            <div onSubmit={handleFormSubmit} className='flashcard_title'>
                <div className='flashcard-inner'>
                    <h3>Chinese Quiz</h3>
                </div>
                <h1>{count + 1}/{arr.length}</h1>
            </div>


            <div className={(count % 2 == 0) ? 'flashcard' : 'flashcardGray'}>
                <div className='no_area' onClick={() => manualClick('no')}>
                    <div className='yesNo_Text'>NO</div>
                </div>

                {hitLimit
                    ? <div className='flashcard-content'>
                        End<button onClick={restart}>Restart</button>
                    </div>
                    : <div className='flashcard-content' onClick={() => manualClick('flip')}>
                        <div>
                            {/* when not flipped */}
                            {flashcardContent && !flipped && flashcardContent.chinese}
                            {/* when flipped */}
                            <div className=''>{flashcardContent && flipped && flashcardContent.pinyin}</div>
                            {flashcardContent && flipped && flashcardContent.meaning}
                            <div className='example'>{flashcardContent && flipped && flashcardContent.example}</div>
                            {/* both */}
                            <div className='countStr'>わからなかった回数({flashcardContent && flashcardContent.no})</div>
                            <div className='countStr'>わかった回数({flashcardContent && flashcardContent.yes})</div>
                        </div>
                    </div>}
                <div className='yes_area' onClick={() => manualClick('yes')}>
                    <div className='yesNo_Text'>Yes</div>
                </div>
            </div>
        </div>
    );
};

export default ChinaFlashcard;








