import React from 'react'
import { BsPencilFill, BsFillTrashFill } from 'react-icons/bs'
import './Table.css'

export const EngTable = ({ engNote, onDelete, onEditStart, userValified }) => {
  return (
    <div className='table-container'>
      <div className='table-wrapper'>
        <table className='table'>
          <thead>
            <tr>
              <th>English</th>
              <th>Meaning</th>
              <th>type</th>
              <th className='expand'>Example</th>
              <th>Y</th>
              <th>N</th>
              <th>Note</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              engNote.map((row, key) => {
                return (
                  <tr key={key}>
                    <td><h4>{row.english}</h4></td>
                    <td>{row.meaning}</td>
                    <td>{row.type}</td>
                    <td className='expand'>{row.example}</td>
                    <td className='expand'>{row.yes}</td>
                    <td className='expand'>{row.no}</td>
                    <td>{row.note}</td>
                    <td>
                      <span className={`${row.status === 'notLearnt' ? 'label label-live' : 'label label-draft'}`}>
                        {row.status === 'notLearnt' ? '未修得' : '習得済み'}
                      </span>
                    </td>
                    <td>
                      <span className='actions'>
                        {userValified && <BsFillTrashFill className='delete-btn' onClick={() => onDelete(row.docId)} />}
                        {userValified && <BsPencilFill onClick={() => onEditStart(row)} />}

                        {!userValified && <div>disabled</div>}


                      </span>
                    </td>
                  </tr>)
              })
            }

          </tbody>

        </table>
      </div>
    </div>
  )
}
