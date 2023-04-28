const Book = require('../model/Book');

// get all books
const getAllBooks = async (req, res, next) => {

    let books;

    try{

        books = await Book.find();

    }catch(e){

        console.log(e);
    }

    if(!books){

        return res.status(404).json({message:"No products found"})
    }
    else{

        return res.status(200).json({books})
    }


}

// get by id

const getById = async(req, res, next) => {

    const _id = req.params.id;
    let book;

    try{

        book = await Book.findById({_id})

    }catch(err){
        console.log(err);
    }

    if(!book){

        return res.status(404).json({message : 'No Book Found'});

    }
    else{

        return res.status(200).json(book);
    }

}


// add book
const addBook = async (req, res ,next) => {

    const {name, author, description, price, available, image} = req.body;
    let book;

    try{

        book = new Book({

            name,
            author,
            description,
            price,
            available,
            image

        })

        await book.save();

    }catch(e){
        console.log(e)
    }

    if(!book){

        return res.status(500).json({message:'unable to add'})

    }
    else{

        return res.status(201).json({book})

    }
}


//update book

const updateBook = async (req, res, next) => {

    const {name, author, description, price, available,image} = req.body;
    const _id = req.params.id;

    let book;

    try{

        book = await Book.findByIdAndUpdate(_id, {
            name,
            author,
            description,
            price,
            available,
            image
        })

        book = await book.save()

    }catch(err){
        console.log(err);
    }

    if(!book){
        
        return res.status(404).json({message : "Unable to update"});
    }
    else{
        
        return res.status(201).json({book});
    }

}


// delete book

const deleteBook = async (req, res, next) => {

    const _id = req.params.id;
    let book;
    try{
        book = await Book.findByIdAndRemove(_id);
    }
    catch(e){
        console.log(e);
    }

    if(!book){

        return res.status(404).json({message : "Unable to delete by THis ID"})

    }else{

        return res.status(200).json({message : "product successfully deleted"});
    }

}



exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;