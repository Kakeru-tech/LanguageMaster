import { useState } from 'react';
import { EngTable } from '../table/EngTable';
import { EngModal } from '../modal/EngModal';
import './ListPage.css';
import '../App.css';

import { db } from '../firebaseConfig';
import {
    collection, addDoc, deleteDoc, doc, updateDoc
} from 'firebase/firestore';
import uuid from 'react-uuid';


const EngListPage = ({ engNote, userValified }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [editOn, setEditOn] = useState(null);
    const [sortType, setSortType] = useState('RecentlyAdded');
    const [search, setSearch] = useState('');

    const refresh = () => {
        setEditOn(null);
    }

    const addModalOpen = () => {
        refresh();
        setModalOpen(true);
    }

    const onAddNew = async (newData) => {
        try {
            const collectionRef = collection(db, 'English');

            const newDocRef = await addDoc(collectionRef,
                {
                    english: newData[0],
                    meaning: newData[1] || '',
                    type: newData[2] || '',
                    example: newData[3] || '',
                    note: newData[4] || '',
                    status: newData[5] || '',
                    yes: 0,
                    no: 0,
                    id: uuid(),
                    lastModified: Date.now(),
                });

            console.log('new document was created. document ID:', newDocRef.id);
        } catch (err) {
            console.log(err);
        }
        refresh();
    }

    const onDelete = async (docId) => {
        await deleteDoc(doc(db, "English", docId));
    }

    const onEditStart = (row) => {
        setModalOpen(true);
        setEditOn(row);
    }

    const onEdit = async (updatedData) => {

        console.log(updatedData[6]);

        try {
            await updateDoc(doc(db, 'English', updatedData[6]), {
                english: updatedData[0],
                meaning: updatedData[1] || '',
                type: updatedData[2] || '',
                example: updatedData[3] || '',
                note: updatedData[4] || '',
                status: updatedData[5] || '',
                lastModified: Date.now(),
            });

        } catch (e) {
            console.log(e);
        }


    }

    const sortedTable = () => {

        let arr = [];

        switch (sortType) {
            case 'RecentlyAdded':
                arr = engNote.sort((a, b) => b.lastModified - a.lastModified);
                break;
            case 'Alphabetically':
                arr = engNote.sort((a, b) => a.english.localeCompare(b.english));
                break;
            case 'Acquired':
                arr = engNote.filter(item => item.status === 'Learnt');
                break;
            case 'NotAcquired':
                arr = engNote.filter(item => item.status === 'notLearnt');
                break;
            case 'question':
                arr = engNote.filter(item => item.status === 'question');
                break;
            case 'search':
                arr = engNote.filter(obj => obj.english.toLowerCase().includes(search));
                break;
        }
        return arr;
    }

    const onSearch = (value) => {
        if (value) {
            setSortType('search');
            setSearch(value);
        } else {
            setSortType('RecentlyAdded');
            setSearch('');
        }
    }

    return (
        <main className='listPage'>


            <div className='option_container'>

                <div className='sort_container'>
                    <div className='sortStr'>Sort by:</div>
                    <select className='sortDropdownBox' value={sortType} onChange={(e) => setSortType(e.target.value)}>
                        <option value='RecentlyAdded'>Date</option>
                        <option value='Alphabetically'>Alphabetically</option>
                        <option value='Acquired'>Acquired</option>
                        <option value='NotAcquired'>Not acquired</option>
                        <option value='question'>Question</option>
                    </select>
                </div>

                <div className='sort_container'>
                    <div className='sortStr'>Search :</div>
                    <input className='searchBox' onChange={(e) => onSearch(e.target.value)} />
                </div>

                {userValified && <button
                    className='listPage_btn'
                    onClick={addModalOpen}>Add a new
                </button>}

            </div>


            <EngTable
                engNote={sortedTable()}
                onDelete={onDelete}
                onEditStart={onEditStart}
                userValified={userValified}
            />


            {modalOpen &&
                <EngModal
                    setModalOpen={setModalOpen}
                    onAddNew={onAddNew}
                    editOn={editOn}
                    onEdit={onEdit} />}

        </main>
    )
}

export default EngListPage

