import { useState } from 'react';
import './App.css';

function Logo(){
  return (
    <h1>🗺 Travel List</h1>
  );
}

function Form({onAddItem}){
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e){
    e.preventDefault();
    if (!description) return false;
    const newItem = {
      description, quantity, id: Date.now(), packed: false
    }
    onAddItem(newItem);
    
    setDescription('')
    setQuantity(1)
  }

  return (
    <div>
      <h3>What do you need to your ❤️ trip?</h3>
      <form onSubmit={handleSubmit}>
        <select value={quantity} onChange={(e)=>{setQuantity(Number(e.target.value))}}>
          {Array.from({length: 20}, (_, i)=>i+1).map(num=>(
            <option value={num} key={num}>{num}</option>
          ))}
        </select>
        <input type="text" placeholder='Item...' value={description} onChange={e=>setDescription(e.target.value)} />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

function Item({item, onDeleteItem, onToggleItem}){
  return (
    <div className='mt-4'>
      <span className='border'>
        <input 
          type="checkbox" 
          value={item.id} 
          checked={item.packed} 
          onChange={()=>onToggleItem(item.id)}  
        />
      </span>
      <span style={item.packed ? {textDecoration:'line-through'}:{}}>
        {item.title}
        {item.description}
      </span>
      <button onClick={()=>onDeleteItem(item.id)}>X</button>
    </div>
  )
}

function PackingList({items, onDeleteItem, onToggleItem}){
  return (
    <div>
        {items.map(item => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ) )}
    </div>
  )
}

function Stats(){
  return (
    <footer>
      <em>Your have X items on your list, and your already packed X (X%)</em>
    </footer>
  )
}

function App() {
  const [items, setItems] = useState([])

  function handleAddItems(newItem) {
    setItems(items=>[...items, newItem])
  }

  function handleDeleteItem(id){
    setItems(items => items.filter(item=>item.id!==id))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  return (
    <>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats />
    </>
  );
}

export default App;
