const routes = require('express').Router();
const dbQueries = require('./database');





routes.get('/blogs', async (Request, Response) => {
    try {
        const blog = await dbQueries.getBlog();
        Response.json(blog);
    }
    catch(error){
        Response.send(error);
    }
});      


//GET

routes.get('/blogid/:id', async (Request, Response) => {
    try {
        const blo = await dbQueries.getBlo(Request.params.id);
        Response.json(blo);
    }
    catch (error) {
        Response.send(error);
    }
});
//Post



     
// TA BORT Blogg
routes.delete('/blog/:id', async (Request, Response) =>{
    try {
        const delblog = await dbQueries.deleteBlog(Request.params.id);
        Response.json(delblog);
    }
    catch(error){
        Response.send(error);
    }
});   

//UPDATERA Blogg
routes.patch('/blogz/:id', async (Request, Response) =>{
    try {
        const data = Request.body;
       {
           await dbQueries.updateBlog(data.name, data.text, data.date,  data.id);
            Response.json("Ändring har hänt i Bloggen");
        } 
    }
    catch{
        res.send(error);
        console.log("hoppsan");

    }

}); 
   
//LÄGG TILL Blogg
routes.post('/db/blog/post', async (Request, Response) => {
  
    try {
        const data = Request.body;
        const found = await dbQueries.getBlogg(Request.body.name);
            

        if (found.length === 0) {
            
                await dbQueries.addBlog(data.name, data.text, data.date);
                Response.json("Bloggen finns i tabellen");
            
           
        } else {
            Response.json('Bloggen finns redan i tabellen');
        }
    }
    catch (error) {
        Response.send(error);
    }
});


module.exports = routes