const { initializeApp } = require('firebase/app');
const { getAuth, onAuthStateChanged } = require('firebase/auth');

const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc
} = require('firebase/firestore/lite');


const firebaseConfig = initializeApp({
    apiKey: "AIzaSyB2e2mgqN2NgrmtTZo2y36Czz4uHQllrEY",
    authDomain: "pedidosgustavorebelatto.firebaseapp.com",
    projectId: "pedidosgustavorebelatto",
    storageBucket: "pedidosgustavorebelatto.appspot.com",
    messagingSenderId: "860362700509",
    appId: "1:860362700509:web:3af9e9872467511c278d34",
    measurementId: "G-DSWMTDYZRL"
  });

  const db = getFirestore();

async function save(nomeTabela, id, dado) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, nomeTabela, id), dado);
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, nomeTabela), dado);
        const savedData = {
            ...dado,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(nomeTabela) {
    const data = await getDocs(collection(db, nomeTabela));
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

async function getById(nomeTabela, id) {
    const docRef = doc(db, nomeTabela, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error("Not found!");
    }

}

async function remove(nomeTabela, id){
    await deleteDoc(doc(db, nomeTabela, id));
    return {
        message:   "Data successfully removed!"
    }
}
async function getById(table_name, id) {
    const docTable = doc(db, table_name, id);
    const docResp = await getDoc(docTable);
    
    if (docResp.exists()) {
        return docResp.data();
    }
    else {
        return new Error("Not found!");
    }
}

module.exports = {
    save,
    get,
    getById,
    remove
}