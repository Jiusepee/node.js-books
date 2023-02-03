// sukuriu serveri
const express = require('express');
const app = express();

//duomenys bus gaunami, perduodami json formatu
app.use(express.json());

//sukuriu masyva
const books = [
    {id: 1, title: 'knyga 1', desc: 'aprasymas knyga 1'},
    {id: 2, title: 'knyga 2', desc: 'aprasymas knyga 2'},
    {id: 3, title: 'knyga 3', desc: 'aprasymas knyga 3'},
    {id: 4, title: 'knyga 4', desc: 'aprasymas knyga 4'},
    {id: 5, title: 'knyga 5', desc: 'aprasymas knyga 5'},
];

//konkrecios knygos paieska
app.get('/api/books/:id', (req, res) => {
    const myBook = books.find(books => books.id === parseInt(req.params.id));
    if(!myBook){
        res.status(404).send('Knyga nerasta');
    } else{
        res.send(myBook);
    }
});

//naujos knygos pridejimas
app.post('/api/books', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        desc: req.body.desc
    };
    books.push(book);
    res.send(book);
});

//knygos atnaujinimas
app.put('/api/books/:id', (req, res) => {
    const myBook = books.find(books => books.id === parseInt(req.params.id));
    if(!myBook){
        res.status(404).send('Knyga nerasta');
    } else{
        myBook.title = req.body.title;
        myBook.desc = req.body.desc;
        res.send(myBook);
    }
})

//knygos trynimas
app.delete('/api/books/:id', (req, res) => {
    const myBook = books.find(books => books.id === parseInt(req.params.id));
    if(!myBook){
        res.status(404).send('Knyga nerasta');
    } else{
        const index = books.indexOf(myBook);
        books.splice(index, 1);
        res.send(myBook);
    }
});


// sukuriu route
app.get('/api/books', (req, res) => {
    res.send(books);
});

//sukuriu port'a
const port = 2002;

//startuoju serveri
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})