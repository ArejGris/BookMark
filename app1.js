class Book{
constructor(title,author,isbn){
this.title=title;
this.author=author;
this.isbn=isbn;
}
}
class UI{
static displaybook(){

const list=[{title:'smith',author:'areg',isbn:'123444'},{title:'smith',author:'areg',isbn:'123444'}];
const books=list;
books.forEach((book)=>{
UI.addTolist(book);
})
}
static addTolist(book){
const row=document.createElement('tr');
row.innerHTML=`<div>${book.title}</div><div>${book.author}</div><div>${book.isbn}</div>`;
document.querySelector('#book-list').appendChild(row);

}
static clearFields(){
document.querySelector('#title').value='';
document.querySelector('#author').value='';
document.querySelector('#isbn').value='';
}
static deleteBook(el){
if(el.classList.contains('delete')){
el.parentElement.parentElement.remove();
}
}
}
document.addEventListener('DOMContentLoaded',UI.displaybook);
document.querySelector('#book-form').document.addEventListener('submit',(e)=>{
e.preventDefault();
const title=document.querySelector('#title').value;
const author=document.querySelector('#author').value;
const isbn=document.querySelector('#isbn').value;
const book=new Book(title,author,isbn);
UI.addTolist(book);

})