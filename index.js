const express = require('express');
const myApp = express();
const Joi = require('joi');
myApp.use(express.json())
const port = process.env.PORT || 5974;
myApp.listen(port,()=> console.log(`listening at port ${port}`));

const genres = [
    {id:1,name:'romance'},
    {id:2,name:'comedy'},
    {id:3,name:'thriller'},

];
myApp.get('/',(req,res) => {
    res.send("You are able to get meee!")
});

myApp.get('/api/genre',(req,res)=>{
    res.send(genres)
});

myApp.get('/api/genre/:id',(req,res)=>{
    const genre = genres.find(g  => g.id===parseInt(req.params.id));
    if(!genre){
        res.status(404).send('MisMatched');
    }
    else{
        res.send(genre.name);
    }
});

myApp.post('/api/genre',(req,res)=>{
    if(!req.body.name){
        return res.status(400).send('Genre name is required');
    }
    else if(req.body.name.length<3){
        return res.status(400).send('name should be atleast 3 letters');
    }
    const genre = {
        id: genres.length+1,
        name : req.body.name
    };
    genres.push();
    res.send(genre);
});

myApp.put('/api/genre/:id',(req,res)=>{
    const genre = genres.find(g => g.id===parseInt(req.params.id));
    if(!genre){
        return res.status(400).send("Id not found");
    }
    else if(req.body.name.length<3){
        return res.status(404).send("Invalid name");
    }
    genre.name = req.body.name;
    res.send(genre);
});

myApp.delete('/api/genre/:id',(req,res)=>{
    const genre = genres.find(g=> g.id=== parseInt(req.params.id));
    if(!genre){
        return res.status(400).send('Id not found');
    }
    const idx = genres.indexOf(genre);
    genres.splice(idx,1);
    res.send(genre);
});







