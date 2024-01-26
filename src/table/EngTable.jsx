import React from 'react'
import { BsPencilFill, BsFillTrashFill } from 'react-icons/bs'
import './Table.css'

export const EngTable = ({ engNote, onDelete, onEditStart, userValified }) => {

  const hasHttpOrHttps = (inputString) => {
    return /^(https?:\/\/)/.test(inputString);
  }

  const confirm = (row) => {
    if (window.confirm(`Are you sure to delete ${row.english}?`)) {
      onDelete(row.docId);
    }
  }

  return (
    <div className='table-container'>
      <div className='table-wrapper'>
        <table className='table'>
          <thead>
            <tr>
              {userValified && <th>Action</th>}
              <th>English</th>
              <th>Meaning</th>
              <th>Status</th>


              <th>type</th>
              <th className='expand1'>Example</th>
              {userValified && <th>Y</th>}
              {userValified && <th>N</th>}
              <th>Note</th>


            </tr>
          </thead>
          <tbody>
            {
              engNote.map((row, key) => {
                return (
                  <tr
                    key={key}
                    className={row.status === 'notLearnt'
                      ? ''
                      : row.status === 'Learnt'
                        ? 'learntRow'
                        : 'question'}>

                    {userValified &&
                      <td>
                        <span className='actions'>
                          <BsFillTrashFill className='delete-btn' onClick={() => confirm(row)} />
                          <BsPencilFill onClick={() => onEditStart(row)} />
                        </span>
                      </td>}

                    <td><h3>{row.english}</h3></td>
                    <td><h4>{row.meaning}</h4></td>

                    <td>
                      <span className={`${row.status === 'notLearnt'
                        ? 'label label-live' :
                        row.status === 'Learnt'
                          ? 'label label-draft'
                          : 'label label-question'}`}>

                        {row.status === 'notLearnt'
                          ? '未修得'
                          : row.status === 'Learnt'
                            ? '習得済み'
                            : '?質問?'}
                      </span>
                    </td>

                    <td>{row.type}</td>
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
