import { useState } from 'react'
import './Modal.css'

export const EngModal = ({ setModalOpen, onAddNew, editOn,onEdit }) => {

    const [english, setEnglish] = useState(editOn ? editOn.english : '');
    const [meaning, setMeaning] = useState(editOn ? editOn.meaning : '');
    const [type, setType] = useState(editOn ? editOn.type : '');
    const [example, setExample] = useState(editOn ? editOn.example : '');
    const [note, setNote] = useState(editOn ? editOn.note : '');
    const [status, setStatus] = useState(editOn ? editOn.status : '');


    const onAdd = async () => {

        if (english) {
            const newData = [english, meaning, type, example, note, status];
            await onAddNew(newData);
            setModalOpen(false);
        }
    }

    const onUpdate = async () => {
        if (english) {
            const newData = [english, meaning, type, example, note, status, editOn.docId];
            await onEdit(newData);
            setModalOpen(false);
        }

    }


    return (
        <div className='modal-container'
            onClick={(e) => {
                if (e.target.className === 'modal-container') setModalOpen(false);
            }
            }>
            <div className='modal'>
                <div className='form-group'>
                    <label htmlFor="page">English</label>
                    <input name='page' value={english} onChange={(e) => setEnglish(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor="page">意味</label>
                    <input name='page' value={meaning} onChange={(e) => setMeaning(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor="status">Type</label>
                    <select name='status' value={type} onChange={(e) => setType(e.target.value)}>
                        <option value=''>Please shoose an option</option>
                        <option value='Noun'>Noun</option>
                        <option value='Verb'>Verb</option>
                        <option value='Adjective'>Adjective</option>
                        <option value='Adverb'>Adverb</option>
                        <option value='Others'>Others</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor="page" >Example</label>
                    <input name='page' value={example} onChange={(e) => setExample(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor="page" >Note</label>
                    <input name='page' value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor="status">Status</label>
                    <select name='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value=''>Please shoose an option</option>
                        <option value='notLearnt'>未修得</option>
                        <option value='Learnt'>習得済み</option>
                    </select>
                </div>


                <button
                    className='submit_btn'
                    onClick={editOn ? onUpdate : onAdd}
                >
                    {editOn ? 'Update' : 'Add a new'} </button>
            </div>
        </div>
    )
}
