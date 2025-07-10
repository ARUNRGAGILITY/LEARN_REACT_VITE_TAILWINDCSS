import React, { useState } from 'react'

// Basic list rendering
function BasicList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Grapes', 'Strawberry']
  const numbers = [1, 2, 3, 4, 5]

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        📋 Basic List Rendering
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-blue-700 mb-2">Fruits List:</h4>
          <ul className="space-y-2">
            {fruits.map((fruit, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-blue-600">{fruit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-blue-700 mb-2">Numbers List:</h4>
          <div className="flex flex-wrap gap-2">
            {numbers.map((num, index) => (
              <span 
                key={index} 
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-semibold"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Object list rendering
function ObjectList() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: false },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', active: true },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', active: true }
  ]

  return (
    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        👥 Object List Rendering
      </h3>
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'Moderator' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {user.role}
                </span>
                <span className={`w-3 h-3 rounded-full ${
                  user.active ? 'bg-green-500' : 'bg-gray-400'
                }`}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Dynamic list with proper keys
function DynamicList() {
  const [items, setItems] = useState([
    { id: 1, text: 'First item', timestamp: Date.now() },
    { id: 2, text: 'Second item', timestamp: Date.now() + 1000 },
    { id: 3, text: 'Third item', timestamp: Date.now() + 2000 }
  ])
  const [newItemText, setNewItemText] = useState('')

  const addItem = () => {
    if (newItemText.trim()) {
      const newItem = {
        id: Date.now(), // Using timestamp as unique ID
        text: newItemText,
        timestamp: Date.now()
      }
      setItems(prev => [...prev, newItem])
      setNewItemText('')
    }
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const moveUp = (index) => {
    if (index > 0) {
      const newItems = [...items]
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]]
      setItems(newItems)
    }
  }

  const moveDown = (index) => {
    if (index < items.length - 1) {
      const newItems = [...items]
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]]
      setItems(newItems)
    }
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        🔄 Dynamic List with Proper Keys
      </h3>
      
      <div className="flex space-x-2 mb-4">
        <input 
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button 
          onClick={addItem}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded font-semibold"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-2 bg-white p-3 rounded border">
            <span className="flex-1 text-gray-800">{item.text}</span>
            <span className="text-xs text-gray-500">ID: {item.id}</span>
            <div className="flex space-x-1">
              <button 
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className={`px-2 py-1 rounded text-xs ${
                  index === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                ↑
              </button>
              <button 
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className={`px-2 py-1 rounded text-xs ${
                  index === items.length - 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                ↓
              </button>
              <button 
                onClick={() => removeItem(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Nested lists
function NestedList() {
  const categories = [
    {
      id: 1,
      name: 'Frontend',
      skills: [
        { id: 11, name: 'React', level: 'Advanced' },
        { id: 12, name: 'JavaScript', level: 'Expert' },
        { id: 13, name: 'CSS', level: 'Intermediate' }
      ]
    },
    {
      id: 2,
      name: 'Backend',
      skills: [
        { id: 21, name: 'Node.js', level: 'Advanced' },
        { id: 22, name: 'Python', level: 'Intermediate' },
        { id: 23, name: 'MongoDB', level: 'Beginner' }
      ]
    },
    {
      id: 3,
      name: 'DevOps',
      skills: [
        { id: 31, name: 'Docker', level: 'Intermediate' },
        { id: 32, name: 'AWS', level: 'Beginner' }
      ]
    }
  ]

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-green-100 text-green-800'
      case 'Advanced': return 'bg-blue-100 text-blue-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Beginner': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        🗂️ Nested List Rendering
      </h3>
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-semibold text-gray-800 mb-3">{category.name}</h4>
            <div className="space-y-2">
              {category.skills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Filtered and sorted lists
function FilteredList() {
  const [products] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999, inStock: true },
    { id: 2, name: 'Book', category: 'Education', price: 29, inStock: false },
    { id: 3, name: 'Phone', category: 'Electronics', price: 699, inStock: true },
    { id: 4, name: 'Desk', category: 'Furniture', price: 199, inStock: true },
    { id: 5, name: 'Chair', category: 'Furniture', price: 149, inStock: false },
    { id: 6, name: 'Tablet', category: 'Electronics', price: 399, inStock: true }
  ])

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    if (filter === 'inStock') return product.inStock
    if (filter === 'outOfStock') return !product.inStock
    return product.category === filter
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]
    
    if (sortBy === 'price') {
      aValue = Number(aValue)
      bValue = Number(bValue)
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return (
    <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
      <h3 className="text-lg font-semibold text-red-800 mb-4">
        🔍 Filtered & Sorted Lists
      </h3>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-red-700 font-medium mb-1">Filter:</label>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Products</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Education">Education</option>
          </select>
        </div>
        
        <div>
          <label className="block text-red-700 font-medium mb-1">Sort By:</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
        </div>
        
        <div>
          <label className="block text-red-700 font-medium mb-1">Order:</label>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {sortedProducts.map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded border">
            <div>
              <h4 className="font-semibold text-gray-800">{product.name}</h4>
              <p className="text-gray-600 text-sm">{product.category}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-800">${product.price}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-red-600 mt-4">
        Showing {sortedProducts.length} of {products.length} products
      </p>
    </div>
  )
}

// Key importance demonstration
function KeyImportance() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', count: 0 },
    { id: 2, name: 'Item 2', count: 0 },
    { id: 3, name: 'Item 3', count: 0 }
  ])

  const [useProperKeys, setUseProperKeys] = useState(true)

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Item ${items.length + 1}`,
      count: 0
    }
    setItems(prev => [newItem, ...prev])
  }

  const removeFirstItem = () => {
    setItems(prev => prev.slice(1))
  }

  const incrementCount = (id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, count: item.count + 1 } : item
    ))
  }

  return (
    <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
      <h3 className="text-lg font-semibold text-indigo-800 mb-4">
        🔑 Key Importance Demonstration
      </h3>
      
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox"
            checked={useProperKeys}
            onChange={(e) => setUseProperKeys(e.target.checked)}
            className="w-4 h-4 text-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-indigo-700">Use proper keys (ID-based)</span>
        </label>
        <p className="text-sm text-indigo-600 mt-1">
          {useProperKeys ? 'Using item.id as key' : 'Using array index as key'}
        </p>
      </div>

      <div className="flex space-x-2 mb-4">
        <button 
          onClick={addItem}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded font-semibold"
        >
          Add Item (at beginning)
        </button>
        <button 
          onClick={removeFirstItem}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
        >
          Remove First Item
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div 
            key={useProperKeys ? item.id : index} 
            className="flex items-center space-x-4 p-3 bg-white rounded border"
          >
            <span className="flex-1 text-gray-800">{item.name}</span>
            <span className="text-sm text-gray-500">Count: {item.count}</span>
            <button 
              onClick={() => incrementCount(item.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              +1
            </button>
            <span className="text-xs text-gray-400">
              Key: {useProperKeys ? item.id : index}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-indigo-100 rounded">
        <p className="text-indigo-800 text-sm">
          <strong>Try this:</strong> Increment some counters, then add/remove items. 
          Notice how the counters behave differently with proper keys vs index keys!
        </p>
      </div>
    </div>
  )
}

// Main App component
function App() {
  const [activeDemo, setActiveDemo] = useState('basic')

  const demos = {
    basic: { component: <BasicList />, name: 'Basic Lists' },
    objects: { component: <ObjectList />, name: 'Object Lists' },
    dynamic: { component: <DynamicList />, name: 'Dynamic Lists' },
    nested: { component: <NestedList />, name: 'Nested Lists' },
    filtered: { component: <FilteredList />, name: 'Filtered Lists' },
    keys: { component: <KeyImportance />, name: 'Key Importance' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 7: Lists and Keys
          </h1>
          <p className="text-lg text-gray-600">
            Rendering dynamic lists efficiently
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📋 List Rendering Demos
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeDemo === key
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {demo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Demo */}
        <div className="mb-6">
          {demos[activeDemo].component}
        </div>

        {/* Key Concepts */}
        <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500 mb-6">
          <h3 className="text-lg font-semibold text-teal-800 mb-3">
            🎓 Lists and Keys Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-teal-700">
              <li>• Basic list rendering with map()</li>
              <li>• Rendering object arrays</li>
              <li>• Dynamic list manipulation</li>
              <li>• Nested list structures</li>
            </ul>
            <ul className="space-y-2 text-teal-700">
              <li>• Filtering and sorting lists</li>
              <li>• Proper key usage</li>
              <li>• Key importance for performance</li>
              <li>• Avoiding index as key</li>
            </ul>
          </div>
        </div>

        {/* Key Rules */}
        <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            🔑 Key Rules to Remember:
          </h3>
          <ul className="space-y-2 text-amber-700">
            <li>• Keys must be unique among siblings</li>
            <li>• Use stable, predictable keys (IDs, not array indices)</li>
            <li>• Keys help React identify which items have changed</li>
            <li>• Don't use Math.random() for keys</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 7 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v8.0-conditional-rendering
          </code>
        </div>
      </div>
    </div>
  )
}

export default App