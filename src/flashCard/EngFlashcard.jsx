import React, { useState, useEffect } from 'react';
import './Flashcard.css';
import '../App.css'


const EngFlashcard = ({ engNote, yesNoUpdate, userValified, openSidebarToggle }) => {

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
    }, [engNote, count, flipped, hitLimit]);

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
                        await yesNoUpdate(arr[count], true, 'English');//
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
                        await yesNoUpdate(arr[count], false, 'English');//
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
        let newArray = engNote.filter(item => item.status === 'notLearnt');

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
        setFlipped(!flipped);
    }
    //
    const nextCardFlipFalse = () => {
        setFlipped(false);
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



    return (
        <div className='flashcard-container'>

            <div onSubmit={handleFormSubmit} className='flashcard_title'>
                <div className='flashcard-inner'>
                    <h3>English Quiz</h3>
                </div>
                <h1>{count + 1}/{arr.length}</h1>
            </div>


            {/* <div className='flashcard'> */}
                <div className={(count % 2 == 0) ? 'flashcard' : 'flashcardGray'}>

                <div className='no_area'><div className='yesNo_Text'>NO</div></div>
                {hitLimit
                    ? <div className='flashcard-content'>
                        End<button onClick={restart}>Restart</button>
                    </div>
                    : <div className='flashcard-content'>
                        <div>
                            {flashcardContent && !flipped && flashcardContent.english}
                            {flashcardContent && flipped && flashcardContent.meaning}
                            <div className='example'>{flashcardContent && flipped && flashcardContent.example}</div>

                            <div className='countStr'>わからなかった回数({flashcardContent && flashcardContent.no})</div>
                            <div className='countStr'>わかった回数({flashcardContent && flashcardContent.yes})</div>
                        </div>
                    </div>}

                <div className='yes_area'><div className='yesNo_Text'>Yes</div></div>
            </div>
        </div>
    );
};

export default EngFlashcard;








