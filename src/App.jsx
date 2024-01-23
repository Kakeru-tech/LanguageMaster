import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar';
import Home from './Home/Home';

import EngListPage from './listPage/EngListPage';
import EngFlashcard from './flashCard/EngFlashcard';
import ChinaListPage from './listPage/ChinaListPage';
import ChinaFlashcard from './flashCard/ChinaFlashcard';

import { db } from './firebaseConfig';
import {
  collection, onSnapshot, doc, updateDoc, increment
} from 'firebase/firestore';


function App() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [engNote, setEngNote] = useState([]);
  const [chinaNote, setChinaNote] = useState([]);

  const [currentPage, setCurrentPage] = useState('');
  const [userValified, setUserValified] = useState(false);


  useEffect(() => {
    const getNotes = async () => {


      const EngcollectionRef = collection(db, 'English');
      const ChinacollectionRef = collection(db, 'Chinese');

      // import english
      const unsubscribeEng = onSnapshot(EngcollectionRef, (querySnapshot) => {
        const documents = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const data = doc.data();

            const newNote = {
              docId: doc.id,
              id: data.id,
              english: data.english,
              lastModified: data.lastModified,
              example: data.example,
              meaning: data.meaning,
              note: data.note,
              status: data.status,
              type: data.type,
              yes: data.yes,
              no: data.no,
            };
            documents.push(newNote);
          } else {
            console.log('No document was founded');
          }
        });
        setEngNote(documents);
      });

      //import chinese

      const unsubscribeChina = onSnapshot(ChinacollectionRef, (querySnapshot) => {
        const documents = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const data = doc.data();

            const newNote = {
              docId: doc.id,
              id: data.id,
              pinyin: data.pinyin,
              chinese: data.chinese,
              lastModified: data.lastModified,
              example: data.example,
              meaning: data.meaning,
              note: data.note,
              status: data.status,
              type: data.type,
              yes: data.yes,
              no: data.no,
            };
            documents.push(newNote);
          } else {
            console.log('No document was founded');
          }
        });
        setChinaNote(documents);
      });

      return () => {
        unsubscribeEng();
        unsubscribeChina();
      };
    };
    getNotes();
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  const pageChanger = (page) => {
    setCurrentPage(page);
  }

  const yesNoUpdate = async (Obj, bool, language) => {

    try {
      if (bool === true) {
        await updateDoc(doc(db, language, Obj.docId), {
          yes: increment(1)
        });

      } else {
        await updateDoc(doc(db, language, Obj.docId), {
          no: increment(1)
        })
      }
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <div className={!openSidebarToggle ? 'grid-container' : 'grid-container-hide'}>
      <Header
        OpenSidebar={OpenSidebar}
        openSidebarToggle={openSidebarToggle}
        userValified={userValified}
        setUserValified={setUserValified}
      />

      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        pageChanger={pageChanger}
      />

      {currentPage == '' && <Home engNote={engNote} chinaNote={chinaNote} />}
      {currentPage == 'engList' &&
        <EngListPage
          engNote={engNote}
          userValified={userValified}
        />}
      {currentPage == 'engQuiz' &&
        <EngFlashcard
          openSidebarToggle={openSidebarToggle}
          engNote={engNote}
          yesNoUpdate={yesNoUpdate}
          userValified={userValified}
        />}

      {currentPage == 'chinaList' &&
        <ChinaListPage
          chinaNote={chinaNote}
          userValified={userValified}
        />}
      {currentPage == 'chinaQuiz' &&
        <ChinaFlashcard
          chinaNote={chinaNote}
          yesNoUpdate={yesNoUpdate}
          userValified={userValified}
        />}
    </div>
  )
}

export default App
