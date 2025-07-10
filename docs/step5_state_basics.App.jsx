import React, { useState } from 'react'

// Simple state example
function SimpleCounter() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        🔢 Simple State Example
      </h3>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
        >
          -
        </button>
        <span className="text-3xl font-bold text-blue-700 min-w-[3rem] text-center">
          {count}
        </span>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
          +
        </button>
      </div>
      <p className="text-sm text-blue-600 mt-3">
        Current count: {count} | Previous update: {count > 0 ? 'Incremented' : count < 0 ? 'Decremented' : 'Initial'}
      </p>
    </div>
  )
}

// Multiple state variables
function UserProfile() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john@example.com')
  const [age, setAge] = useState(25)
  const [isOnline, setIsOnline] = useState(true)

  return (
    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        👤 Multiple State Variables
      </h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-20 text-green-700 font-medium">Name:</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-20 text-green-700 font-medium">Email:</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-20 text-green-700 font-medium">Age:</label>
          <input 
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-24 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-20 text-green-700 font-medium">Status:</label>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              isOnline 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>
        <div className="mt-4 p-3 bg-green-100 rounded">
          <p className="text-green-800">
            <strong>Profile:</strong> {name}, {age} years old, {email}
            <span className={`ml-2 px-2 py-1 rounded text-xs ${
              isOnline ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
            }`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

// Object state
function Settings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
    fontSize: 'medium'
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        ⚙️ Object State Management
      </h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-24 text-purple-700 font-medium">Theme:</label>
          <select 
            value={settings.theme}
            onChange={(e) => updateSetting('theme', e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-24 text-purple-700 font-medium">Language:</label>
          <select 
            value={settings.language}
            onChange={(e) => updateSetting('language', e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-24 text-purple-700 font-medium">Font Size:</label>
          <select 
            value={settings.fontSize}
            onChange={(e) => updateSetting('fontSize', e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-24 text-purple-700 font-medium">Notifications:</label>
          <button 
            onClick={() => updateSetting('notifications', !settings.notifications)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              settings.notifications 
                ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            {settings.notifications ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        <div className="mt-4 p-3 bg-purple-100 rounded">
          <p className="text-purple-800 font-mono text-sm">
            {JSON.stringify(settings, null, 2)}
          </p>
        </div>
      </div>
    </div>
  )
}

// Array state
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React useState', completed: true },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Master state management', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        📝 Array State Management
      </h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input 
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button 
            onClick={addTodo}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center space-x-3 p-3 bg-white rounded border">
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="text-sm text-yellow-700">
          Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
        </div>
      </div>
    </div>
  )
}

// State with complex logic
function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  React.useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const reset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
      <h3 className="text-lg font-semibold text-red-800 mb-4">
        ⏱️ Timer with Complex State Logic
      </h3>
      <div className="text-center">
        <div className="text-4xl font-mono font-bold text-red-700 mb-4">
          {formatTime(seconds)}
        </div>
        <div className="space-x-2">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={reset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

// Main App component
function App() {
  const [activeDemo, setActiveDemo] = useState('counter')

  const demos = {
    counter: { component: <SimpleCounter />, name: 'Simple Counter' },
    profile: { component: <UserProfile />, name: 'User Profile' },
    settings: { component: <Settings />, name: 'Settings' },
    todos: { component: <TodoList />, name: 'Todo List' },
    timer: { component: <Timer />, name: 'Timer' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 5: State Basics
          </h1>
          <p className="text-lg text-gray-600">
            Managing component state with useState
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎮 Interactive State Demos
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeDemo === key
                    ? 'bg-blue-500 text-white'
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
        <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500 mb-6">
          <h3 className="text-lg font-semibold text-indigo-800 mb-3">
            🎓 useState Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-indigo-700">
              <li>• Basic useState syntax</li>
              <li>• Multiple state variables</li>
              <li>• Object state updates</li>
              <li>• Array state management</li>
            </ul>
            <ul className="space-y-2 text-indigo-700">
              <li>• State immutability</li>
              <li>• Functional state updates</li>
              <li>• State and re-renders</li>
              <li>• Complex state logic</li>
            </ul>
          </div>
        </div>

        {/* State Rules */}
        <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            📋 Important State Rules:
          </h3>
          <ul className="space-y-2 text-amber-700">
            <li>• Always use setState to update state, never mutate directly</li>
            <li>• State updates are asynchronous and may be batched</li>
            <li>• When updating objects/arrays, create new copies</li>
            <li>• Use functional updates for state that depends on previous state</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 5 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v6.0-event-handling
          </code>
        </div>
      </div>
    </div>
  )
}

export default App