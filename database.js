const Promises = require('bluebird');
const sqlite = require ('sqlite');
const dbCon = sqlite.open('app.db', {Promises});

const getBlog = async()=> {
    try {
        const db = await dbCon;
        const blog = await db.all('SELECT name, text, date, id FROM blog');
        
        return blog;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  




//TA BORT PODUKT
const deleteBlog = async(id)=> {
    try {
        const db = await dbCon;
        const delblog = await db.all('DELETE FROM blog WHERE id = ?', [id]);
        
        return delblog;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  

//VISA EN PRODUKT
const getBlo = async (id) => {
    const db = await dbCon;
    const blo = await db.get('SELECT * FROM blog WHERE id =  (?)', [id]);
    return blo;

};

//nr 2
const getBlogg = async (id) => {
    const db = await dbCon;
    const blogu = await db.all('SELECT * FROM blog WHERE id =  (?)', [id]);
    return blogu;

};

//UPPDATERA blogg
const updateBlog = async(name, text, date, id)=> {
    try {
        const db = await dbCon;
        const uppblog = await db.all('UPDATE blog SET name=?, text=?, date=? WHERE id = ?', [name, text, date, id]);
        
        return uppblog;
    }
    catch(error) {
        console.log('något gick fel');
        console.log(error);
        return error;
    }
};  
//LÄGG TILL EN BLOGG
const addBlog = async (name, text, date) => {
    try { const db = await dbCon;
     const adblog = await db.all('INSERT INTO blog (name, text, date) VALUES (?, ?, ?)', [name, text, date]);
     return adblog;
     } catch(error) {
         throw error;
     }
 
 };



module.exports = {getBlog: getBlog, deleteBlog: deleteBlog, getBlo: getBlo, updateBlog: updateBlog, addBlog: addBlog,   getBlogg: getBlogg }; 