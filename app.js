class Book{
constructor(title,author,isbn){
this.title=title;
this.author=author;
this.isbn=isbn;
}
}
class UI{
      static displaybook(){
      const books=Store.getBooks();
        books.forEach((book) => {UI.addTolist(book);});
    }
      static addTolist(book){
          const list=document.querySelector('#book-list');
         const row= document.createElement('tr');
          row.innerHTML=`
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
          list.appendChild(row);
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
      static showAlert(message,className){
         const div=document.createElement('div');
         div.className=`alert alert-${className}`;
         div.appendChild(document.createTextNode(message));
         const container=document.getElementsByClassName('.container');
         const form=document.getElementById('#book-list');
         container.insertBefore(div,form);
         setTimeout(()=>document.querySelector('.alert').remove(),3000
         )
      }
  
  }
  class Store{
  static getBooks(){
  let books;
  if(localStorage.getItem('books')==null){
  books=[];
  }else{
  books=JSON.parse(localStorage.getItem('books'));
  return books;
  }
  }
  static addBook(book){
  const books=Store.getBooks();
  books.push(book);
  localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(isbn){
  const books=Store.getBooks();
  books.forEach((book,index)=>{
  if(book.isbn==isbn){
  books.splice(index,1);
  }
  });
  localStorage.setItem('books',JSON.stringify( books))
  }
  }
document.addEventListener('DOMContentLoaded',UI.displaybook);
document.querySelector('#book-form').addEventListener('submit',(e)=>{
e.preventDefault();
    const title= document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
     const book=new Book(title,author,isbn);
     if(title ==='' || author ===''|| isbn ===''){alert('please fill in all fields');}else{
    UI.addTolist(book);
    //add book to store
    Store.addBook(book);
    UI.showAlert('Book Added','success')
    UI.clearFields();}
});

document.querySelector('#book-list').addEventListener('click',(e)=>{

UI.deleteBook(e.target);
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
UI.showAlert('Book removed','success');
})

