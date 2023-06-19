const graphql = require('graphql');
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID, 
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = graphql;
const Book = require('../models/book');
const Author = require('../models/author');

// dummy data
// const books = [
//     {name: 'Name of the book', genre: 'Fantasy', id: '1',authorId: '3'},
//     {name: 'Name of the Math-book', genre: 'Text-book', id: '2',authorId: '2'},
//     {name: 'Name of the Physics-book', genre: 'Practice-set', id: '3',authorId: '1'},
//     {name: 'Name of the book', genre: 'Fantasy', id: '4',authorId: '3'},
//     {name: 'Name of the Math-book', genre: 'Text-book', id: '5',authorId: '2'},
//     {name: 'Name of the Physics-book', genre: 'Practice-set', id: '6',authorId: '1'},
// ];

// const authors = [
//     {name: 'Prasannjit', age: '32', id: '1'},
//     {name: 'Prabhat', age: '42', id: '2'},
//     {name: 'Sonu', age: '33', id: '3'}
// ];

// variable types

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
                // return authors.find((a)=>{
                //     return a.id === parent.authorId;
                // })
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return books.filter((b) => {
                //    return b.authorId === parent.id
                // })
                return Book.find({
                    authorId: parent.id
                });
            }
        }
    })
});

// query 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', // any name
    fields: {
        book: {
            type: BookType, // type that you defined
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                // code to get data from db
                // return books.find((b)=>{
                //        return b.id === args.id;
                // })
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType, // type that you defined
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                // code to get data from db
                // return authors.find((b)=>{
                //        return b.id === args.id;
                // })
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
               // return books;
               return Book.find({});
            }

        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
              //  return authors;
              return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name:{type: new GraphQLNonNull(GraphQLString)},
                genre:{type: new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})