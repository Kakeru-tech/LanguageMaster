import { useState } from 'react';
import { ChinaTable } from '../table/ChinaTable';
import { ChinaModal } from '../modal/ChinaModal';
import './ListPage.css';
import '../App.css';

import { db } from '../firebaseConfig';
import {
    collection, addDoc, deleteDoc, doc, updateDoc
} from 'firebase/firestore';
import uuid from 'react-uuid';


const ChinaListPage = ({ chinaNote, userValified }) => {

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
            const collectionRef = collection(db, 'Chinese');

            const newDocRef = await addDoc(collectionRef,
                {
                    chinese: newData[0],
                    pinyin: newData[1] || '',
                    meaning: newData[2] || '',
                    type: newData[3] || '',
                    example: newData[4] || '',
                    note: newData[5] || '',
                    status: newData[6] || '',
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
        await deleteDoc(doc(db, "Chinese", docId));
    }

    const onEditStart = (row) => {
        setModalOpen(true);
        setEditOn(row);
    }

    const onEdit = async (updatedData) => {

        console.log(updatedData[6]);

        try {
            await updateDoc(doc(db, 'Chinese', updatedData[7]), {
                chinese: updatedData[0],
                pinyin: updatedData[1],
                meaning: updatedData[2] || '',
                type: updatedData[3] || '',
                example: updatedData[4] || '',
                note: updatedData[5] || '',
                status: updatedData[6] || '',
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
                arr = chinaNote.sort((a, b) => b.lastModified - a.lastModified);
                break;
            case 'Alphabetically':
                arr = chinaNote.sort((a, b) => a.chinese.localeCompare(b.chinese));
                break;
            case 'Acquired':
                arr = chinaNote.filter(item => item.status === 'Learnt');
                break;
            case 'NotAcquired':
                arr = chinaNote.filter(item => item.status === 'notLearnt');
                break;
            case 'question':
                arr = chinaNote.filter(item => item.status === 'question');
                break;
            case 'search':
                arr = chinaNote.filter(obj => obj.chinese.includes(search));
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
                    <div className='sortStr'>排序:</div>
                    <select className='sortDropdownBox' value={sortType} onChange={(e) => setSortType(e.target.value)}>
                        <option value='RecentlyAdded'>Date</option>
                        <option value='Alphabetically'>Alphabetically</option>
                        <option value='Acquired'>Acquired</option>
                        <option value='NotAcquired'>Not acquired</option>
                        <option value='question'>Question</option>
                    </select>
                </div>

                <div className='sort_container'>
                    <div className='sortStr'>搜索 :</div>
                    <input className='searchBox' onChange={(e) => onSearch(e.target.value)} />
                </div>


                {userValified && <button
                    className='listPage_btn'
                    onClick={addModalOpen}>Add a new
                </button>}

            </div>

            <ChinaTable
                chinaNote={sortedTable()}
                onDelete={onDelete}
                onEditStart={onEditStart}
                userValified={userValified} />

            {modalOpen &&
                <ChinaModal
                    setModalOpen={setModalOpen}
                    onAddNew={onAddNew}
                    editOn={editOn}
                    onEdit={onEdit} />}

        </main>
    )
}

export default ChinaListPage

