import express from 'express';
import cors from 'cors';

const app = express();
export const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all pages
app.get("/api/get", (req,res)=>{
    query("SELECT * FROM page;", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });

// Route to get one page
app.get("/api/getFromId/:id", (req,res)=>{

const id = req.params.pageID;
 query("SELECT * FROM page WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

// Route for creating the page
app.post('/api/create', (req,res)=> {

const Pname = req.body.Pname;
const pageID = req.body.pageID;
const uid = req.body.uid;

    query("INSERT INTO page (Pname, pageID, uid) VALUES (?,?,?)",[Pname,pageID,uid], (err,result)=>{
   if(err) {
   console.log(err)
   } 
   console.log(result)
});   })

// Route for creating a counter
app.post('/api/create', (req,res)=> {

    const Cname = req.body.Cname;
    const counterID= req.body.counterID;
    const value = req.body.Cname;
    const pid = req.body.pid;
    
    query("INSERT INTO page (Cname, counterID, value, pid) VALUES (?,?,?,?)",[Cname,counterID,value, pid], (err,result)=>{
       if(err) {
       console.log(err)
       } 
       console.log(result)
    });   })



//create display counters, display 1 counter, deleting counter/page/user, create user, update user, also app.delete and stuff matters
//also might not work b/c localhost doesnt have the server on it




// Route to like a post
app.post('/api/like/:id',(req,res)=>{

const id = req.params.id;
    query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

    query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

app.listen(PORT, ()=>{
    console.log('Server is running on ' + PORT);
})