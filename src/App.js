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

function PackingList({items, onDeleteItem, onToggleItem, onClearList}){
  
  const [sortBy, setSortBy] = useState('input')

  let sortedItems;

  if (sortBy === 'input') sortedItems = items

  if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))

  if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => a.packed - b.packed)

  return (
    <div>
        <div>
          {sortedItems.map(item => (
            <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
          ) )}
        </div>
        {sortedItems.length?
        (
          <>
            {sortedItems.length > 1 ? (<div>
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                <option value="input" key="input">Sort by input</option>
                <option value="description" key="description">Sort by description</option>
                <option value="packed" key="packed">Sort by packed</option>
              </select>
            </div>):''} 
            
            <button onClick={onClearList}>Clear List</button>
          </>
        ):""}
        
    </div>
  )
}

function Stats({items}){

  if(!items.length) return (
    <p>
      Now time to start packing bags!
    </p>
  )

  const numItems = items.length
  const packedNumItems = items.filter(item=>item.packed).length
  const packedPercent = Math.ceil(packedNumItems/numItems*100)
  return (
    <footer>
      <em>Your have {numItems} items on your list, and your already packed {packedNumItems} ({packedPercent}%)</em>
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

  function handleClearList(){
    const confirmed = window.confirm('Are you shure that you want to cleart list?')
    if(confirmed) setItems([])
  }

  return (
    <>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onClearList={handleClearList} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </>
  );
}

export default App;
