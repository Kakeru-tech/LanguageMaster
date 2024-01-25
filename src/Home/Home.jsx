import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsBellFill } from 'react-icons/bs';
import './Home.css'


function Home({ engNote, chinaNote, pageChanger }) {

    const notLearntArray = (arr) => {
        let newArray = arr.filter(item => item.status === 'notLearnt');
        return newArray;
    }

    return (
        <main className='main-container'>

            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>

                <div className='card' onClick={() => pageChanger('engList')}>
                    <div className='card-inner'>
                        <h3>English List</h3>
                        <BsFillArchiveFill className='card-icon' />
                    </div>
                    <div>Total :<h1>{engNote.length}</h1></div>
                </div>

                <div className='card' onClick={() => pageChanger('engQuiz')}>
                    <div className='card-inner'>
                        <h3>English (Learning)</h3>
                        <BsFillGrid3X3GapFill className='card-icon' />
                    </div>
                    <div>Total :<h1>{notLearntArray(engNote).length}</h1></div>
                </div>

                <div className='card' onClick={() => pageChanger('chinaList')}>
                    <div className='card-inner'>
                        <h3>Chinese List</h3>
                        <BsPeopleFill className='card-icon' />
                    </div>
                    <div>Total :<h1>{chinaNote.length}</h1></div>
                </div>

                <div className='card' onClick={() => pageChanger('chinaQuiz')}>
                    <div className='card-inner'>
                        <h3>Chinese (Learning)</h3>
                        <BsBellFill className='card-icon' />
                    </div>
                    <div>Total :<h1>{notLearntArray(chinaNote).length}</h1></div>
                </div>

            </div>
        </main >
    )
}

export default Home