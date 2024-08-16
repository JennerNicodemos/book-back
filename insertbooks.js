const mongoose = require('mongoose');
const BookRecord = require('./models/booklist.model');
const booksData = require('./data/books.json');

mongoose.connect("mongodb+srv://jn:123@cluster0.ieyrhht.mongodb.net/book");


const connection = mongoose.connection;

connection.once('open', async () => {
    try {
      // Insert each book from the JSON data into the database
      for (const bookData of booksData.books) {
        const { title, author, description } = bookData;
        const newBook = new BookRecord({ title, author, description });
        await newBook.save();
        console.log(`Inserted book: ${title}`);
      }
  
      console.log('All books inserted successfully.');
      connection.close();
    } catch (error) {
      console.error('Error inserting books:', error);
      connection.close();
    }
  });