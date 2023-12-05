// import logo from './logo.svg';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './index.css';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchBox from './SearchBox';




function App() {
  const [items, setItems] = useState([]);
const [newItem, setNewItem] = useState('')
const [search, setsearch] = useState('')

useEffect( () =>{
  JSON.parse(localStorage.getItem('todo_list'))
}, [] )
const addItem = (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  const addNewItem = { id, checked: false, item };
  const listItems = [...items, addNewItem];
  setItems(listItems);
  localStorage.setItem("todo_list", JSON.stringify(listItems));
};

  const handelCheck = (id) =>{
    const listItems = items.map((item) => item.id===id ? {...item, checked:!item.checked} : item)
    setItems(listItems)
    localStorage.setItem("todo_list",JSON.stringify(listItems))
  }
  const handleDelete = (id) => {
    const listItems =  items.filter((item) => item.id!==id  )
    setItems(listItems)
    localStorage.setItem("todo_list",JSON.stringify(listItems))
  } 
const handleSubmit= (e)=> {
    e.preventDefault()
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
}

  return (
    <div className='App'>
        <Header title="GouthamS"/>
        <AddItem
          newItem = {newItem}
          setNewItem = {setNewItem}
          handleSubmit = {handleSubmit}
        />
        <SearchBox
          search = {search}
          setsearch = {setsearch}
        />
        <Content 
        items={items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))}
        handelCheck={handelCheck}
        handleDelete={handleDelete}
        />
        <Footer length={items.length}/>
    </div>
  );
}

export default App;
