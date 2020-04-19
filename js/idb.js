// indexedDB stuff
// In the following line, you should include the prefixes of implementations you want to test.
//window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
//window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
//window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

// indexedDB stuff
let indexedDB;
if (self.indexedDB) {
  indexedDB = self.indexedDB;
} else {
  indexedDB = window.indexedDB;
}

const request = window.indexedDB.open("McMobster", 1);
let db;

request.onupgradeneeded= (event ) =>{
console.log('onupgradeneeded');
const db = request.result;
const outBox = db.createObjectStore(name ='outBox', optimalParameters= {autoIncrement: true});
const intBox = db.createObjectStore(name ='intBox', optimalParameters= {autoIncrement: true});
}

request.onerror = (event ) => {
console.log("Why would you not allow my web app to use IndexedDB?!")
;};

request.onsuccess  = (event) => {
    console.log("DB is succesfuly open!");
    db = request.result;
   db.onerror =(evet)=>{
       console.error('Database error: ', event=target.errorCode);
   }
};

const saveData= (name, data)=>{
    return new Promise((resolve, reject)=>{
    const tx = db.transaction(name,'readwrite');
    const store = tx.objectStore(name);
    store.put(value = data);
    tx.oncomplete=()=>{console.log('put ready')
        resolve(trure);
};
    tx.onerror=()=>{console.log('put error')
    reject('put error')
};
    
});
}

const loadData = (name)=>{
    return new Promise((resolve, reject)=>{
 const tx = db.transaction(name, 'readwrite');
   const store = tx.objectStore(name);
   const querry=store.getAll();
   tx.oncomplete=()=>{console.log('querry ready', querry.result)
                        resolve(querry.result);
};
   tx.onerror=()=>{console.log('querry error')
   reject('querry error');
}; 
});
};



const clearData =(name)=>{
    return new Promise((resolve, reject)=>{
    const tx = db.transaction(name, 'readwrite');
   const store = tx.objectStore(name);
   store.clear();
   tx.oncomplete=()=>{console.log('clear ready')
        resolve(true);
};
   tx.onerror=()=>{console.log('clear error')
    reject('clear error')
};
    });
}