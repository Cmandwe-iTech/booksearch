import React from "react";
import { useState } from "react";
import "./search.css"
import Header from './header'
const Book = () =>{
    const [bookData, setbookData] = useState([])
    const [hover, sethover] = useState(false)
    
   async function render (e){
        e.preventDefault();

        const search = e.target.value;

        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
        .then((data)=>{
            return data.json();
        }).then((book)=>{
           let Book = {
            title: book.items[0].volumeInfo.title,
            authors: book.items[0].volumeInfo.authors,
            pageCount: book.items[0].volumeInfo.pageCount,
            image: book.items[0].volumeInfo.imageLinks.smallThumbnail,
            rating: book.items[0].volumeInfo.averageRating,
            infoLink: book.items[0].volumeInfo.infoLink,
           };
           setbookData([Book])
        })
    }
    return(
        <>
        <Header/>
        <div className="main-container">
        <div className="search-container">
            <input type="text" placeholder="search book" id="srch" onChange={(e)=>render(e)}/>
        </div>
        <div className="book-container">
           {
            bookData.map((obj, i)=>{
               return(
                <div  key={i} className="books-details"
                onMouseDown={()=>{sethover(true)}}
                onMouseLeave={()=>{sethover(false)}}
                onClick={()=>window.open(obj.infoLink, "_blank")}
                >
          {hover ? (
                <div>
                <div>Title: {obj.title}</div>
                <div>Authors: {obj.authors}</div>
                <div>Rating: {obj.rating}</div>
                <div>Pages: {obj.pageCount}</div>
              </div>
            ):(
                <img
                src={obj.image}
                alt="Cover"
              />
            )
          }
                </div>
               )
            })
           }
        </div>
        </div>
        </>
    )
}

export default Book