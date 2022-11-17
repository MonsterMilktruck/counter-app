const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "mysql",
database:"counter" 
})

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json());


/* GETTING */

/* pages */

// Route to get all pages for a user
app.get("/api/get", (req,res)=>{

    db.query("SELECT * FROM page;", (err,result)=>{
    if(err) {
    console.log(err)
    } 
    console.log("Get request successful: Pages displayed");
res.send(result)
});   });

// Route to get page ID for next page
app.get("/api/getNext/:id/:uid", (req,res)=>{

    const id = req.params.id;
    const uid = req.params.uid;

    db.query("SELECT pageID FROM page WHERE pageID = (SELECT min(pageID) FROM page WHERE pageID > ?) and uid = ?;",[id, uid],
    (err,result)=>{
    if(err) {
    console.log(err)
    } 
    console.log("Get request successful: page after retrieved");
    res.send(result)
});   });

// Route to get page ID for back page
app.get("/api/getBack/:id/:uid", (req,res)=>{

    const id = req.params.id;
    const uid = req.params.uid;

    db.query("SELECT pageID FROM page WHERE pageID = (SELECT max(pageID) FROM page WHERE pageID < ?) and uid = ?;",[id, uid],
    (err,result)=>{
    if(err) {
    console.log(err)
    } 
    console.log("Get request successful: page before retrieved");
res.send(result)
});   });

// Route to get one page for a user
app.get("/api/getFromId/:id/:uid", (req,res)=>{

const id = req.params.id;
const uid = req.params.uid;


 db.query("SELECT * FROM page WHERE pageID = ? and uid = ?;", [id, uid], 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    else if(result.data === [])
    {
        //NOTE: Doesnt send this to console but returns it anyways - also url for next page is still bugged
        console.log("Get request returned null");
    }
    else {
    console.log("Get request successful for " + uid + "." + result[0]["Tname"]);
    res.send(result);
    }
    });   });

    // Route to get # of pages for a user
app.get("/api/getCount/:uid", (req,res)=>{
    const uid = req.params.uid;


    db.query("SELECT count(*) FROM page WHERE uid = ?;", [uid], (err,result)=>{
    if(err) {
    console.log(err)
    } 
    count = result[0]['count(*)']
    console.log("Get request successful for count: " + count);
res.send(result)
});   });

/* counters */

// Route to get all counters for 1 page
app.get("/api/getCounters/:pid", (req,res)=>{

    const pID = req.params.pid;

    db.query("SELECT * FROM counter where pid = ?;", [pID], (err,result)=>{
    if(err) {
    console.log(err)
    } 
    console.log("Get request successful: Counters displayed");
res.send(result)
});   });

//gets last counterID
app.get("/api/lastCounter", (req,res)=>{


    db.query("SELECT max(counterID) FROM counter;", (err,result)=>{
    if(err) {
    console.log(err)
    } 
    console.log("Get request successful: max counter retrieved");
res.send(result)
});   });


/* UPDATING */

// Route to update a page's name
app.put('/api/updatePageName', (req,res)=> {

    const Pname = req.body.Pname;
    const pageID = req.body.pageID;
    const uid = req.body.uid;
    
        db.query("INSERT INTO page (Pname, pageID, uid) VALUES (?,?,?)",[Pname,pageID,uid], (err,result)=>{
       if(err) {
       console.log(err)
       } 
       console.log(result)
    });   })


/* CREATING */

// Route for creating the page
app.post('/api/create', (req,res)=> {

const Pname = req.body.Pname;
const pageID = req.body.pageID;
const uid = req.body.uid;

    db.query("INSERT INTO page (Pname, pageID, uid) VALUES (?,?,?)",[Pname,pageID,uid], (err,result)=>{
   if(err) {
   console.log(err)
   } 
   console.log(result)
});   })

// Route for creating a counter
app.post("/api/create/counter/:Cname/:counterID/:pid", (req,res)=> {

    const Cname = req.params.Cname;
    const counterID= req.params.counterID;
    const pid = req.params.pid;
    
    
    db.query("INSERT INTO counter (Cname, counterID, value, pid) VALUES (?,?,0,?)",[Cname,counterID, pid], (err,result)=>{
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
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

app.listen(PORT, ()=>{
    console.log('Server is running on ' + PORT);
})