import React from 'react'
import { BsPencilFill, BsFillTrashFill } from 'react-icons/bs'
import './Table.css'

export const ChinaTable = ({ chinaNote, onDelete, onEditStart, userValified }) => {

    const hasHttpOrHttps = (inputString) => {
        return /^(https?:\/\/)/.test(inputString);
    }


    return (
        <div className='table-container'>
            <div className='table-wrapper'>
                <table className='table'>
                    <thead>
                        <tr>
                            {userValified && <th>编辑</th>}
                            <th>中文</th>
                            <th>拼音</th>
                            <th>意思</th>
                            <th>状态</th>

                            {/* <th>type</th> */}
                            <th className='expand1'>用法</th>
                            {userValified && <th>Y</th>}
                            {userValified && <th>N</th>}
                            <th>笔记</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            chinaNote.map((row, key) => {
                                return (
                                    <tr key={key} className={row.status === 'notLearnt' ? '' : 'learntRow'}>
                                        {userValified &&
                                            <td>
                                                <span className='actions'>
                                                    <BsFillTrashFill className='delete-btn' onClick={() => onDelete(row.docId)} />
                                                    <BsPencilFill onClick={() => onEditStart(row)} />
                                                </span>
                                            </td>}

                                        <td><h3>{row.chinese}</h3></td>
                                        <td>{row.pinyin}</td>
                                        <td>{row.meaning}</td>

                                        <td>
                                            <span className={`${row.status === 'notLearnt' ? 'label label-live' : 'label label-draft'}`}>
                                                {row.status === 'notLearnt' ? '没学过' : '学到了'}
                                            </span>
                                        </td>


                                        {/* <td>{row.type}</td> */}
                                        <td className='expand1'>{row.example}</td>
                                        {userValified && <td>{row.yes}</td>}
                                        {userValified && <td>{row.no}</td>}

                                        {hasHttpOrHttps(row.note)
                                            ? <td><a href={row.note}>Link</a></td>
                                            : <td>{row.note}</td>
                                        }
                                    </tr>)
                            })
                        }

                    </tbody>

                </table>
            </div>
        </div>
    )
}
