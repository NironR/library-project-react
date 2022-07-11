import React, {useEffect, useState} from "react";
import Nav from "./components/Nav.jsx"
import Home from  "./pages/Home.jsx"
import Footer from "./components/Footer.jsx";
import Books from "./pages/Books.jsx"
import BookInfo from "./pages/BookInfo.jsx"
import { books } from "../src/data.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from "./pages/Cart.jsx";



function App() {

  const [cart, setCart] = useState([]);

  function addToCart(book) {
    const dupeItem = cart.find(item => +item.id === +book.id)
    if (dupeItem) {
      dupeItem.quantity += 1
      setCart(cart.map(item => {
       if (item.id === dupeItem.id) {
        return {
          ...item, 
          quantity: item.quantity +1
        }
       }
       else {
        return item
       }
      }))
    }
   else {
    setCart([...cart, {...book, quantity: 1}])
   }
   
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) => {
        return item.id === book.id
          ? {
            ...item,
            quantity: +quantity,
          }
        : item;
      })
    )
  }

  function removeItem(item) {
        setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <Router>
    <div className="App">
      <Nav numberOfItems={numberOfItems()}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/books/:id" element={<BookInfo books={books}
          addToCart={addToCart} cart={cart}/> }/>
          <Route path="/cart" element={<Cart books={books} cart={cart}
          changeQuantity={changeQuantity}
          removeItem={removeItem}/>}/> 
        </Routes>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
