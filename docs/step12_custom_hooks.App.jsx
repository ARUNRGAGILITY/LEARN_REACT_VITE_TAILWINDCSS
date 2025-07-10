import React, { useState, useEffect, useCallback } from 'react'

// Custom hook for counter logic
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(prev => prev + step)
  }, [step])

  const decrement = useCallback(() => {
    setCount(prev => prev - step)
  }, [step])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  const setValue = useCallback((value) => {
    setCount(value)
  }, [])

  return { count, increment, decrement, reset, setValue }
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

// Custom hook for API calls
function useApi(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (customUrl = url) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(customUrl, options)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [fetchData, url])

  return { data, loading, error, refetch }
}

// Custom hook for debounced values
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// Custom hook for toggle functionality
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return { value, toggle, setTrue, setFalse, setValue }
}

// Custom hook for form handling
function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = useCallback((fieldName, fieldValue) => {
    const rules = validationRules[fieldName]
    if (!rules) return ''

    for (const rule of rules) {
      const error = rule(fieldValue, values)
      if (error) return error
    }
    return ''
  }, [validationRules, values])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validate(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [validate, touched])

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validate(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [validate])

  const handleSubmit = useCallback((onSubmit) => {
    return (e) => {
      e.preventDefault()
      
      const newErrors = {}
      Object.keys(values).forEach(key => {
        const error = validate(key, values[key])
        if (error) newErrors[key] = error
      })
      
      setErrors(newErrors)
      setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      
      if (Object.keys(newErrors).length === 0) {
        onSubmit(values)
      }
    }
  }, [values, validate])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  }
}

// Component demonstrating basic custom hooks
function BasicCustomHooks() {
  const counter1 = useCounter(0, 1)
  const counter2 = useCounter(10, 5)
  const [name, setName] = useLocalStorage('username', '')
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const windowSize = useWindowSize()
  const darkMode = useToggle(false)

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        🔧 Basic Custom Hooks
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Counter Hook */}
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">useCounter Hook</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Counter 1 (step: 1):</span>
              <button onClick={counter1.decrement} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
              <span className="font-bold text-blue-600">{counter1.count}</span>
              <button onClick={counter1.increment} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
              <button onClick={counter1.reset} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">Reset</button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Counter 2 (step: 5):</span>
              <button onClick={counter2.decrement} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
              <span className="font-bold text-blue-600">{counter2.count}</span>
              <button onClick={counter2.increment} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
              <button onClick={counter2.reset} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">Reset</button>
            </div>
          </div>
        </div>

        {/* Local Storage Hook */}
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">useLocalStorage Hook</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name (stored in localStorage):</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Theme:</label>
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>

        {/* Window Size Hook */}
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">useWindowSize Hook</h4>
          <div className="text-sm text-gray-600">
            <p>Width: <span className="font-bold text-blue-600">{windowSize.width}px</span></p>
            <p>Height: <span className="font-bold text-blue-600">{windowSize.height}px</span></p>
            <p className="mt-2 text-xs">Resize window to see changes</p>
          </div>
        </div>

        {/* Toggle Hook */}
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">useToggle Hook</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Dark Mode:</span>
              <button 
                onClick={darkMode.toggle}
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  darkMode.value ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {darkMode.value ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="flex space-x-2">
              <button onClick={darkMode.setTrue} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                Set True
              </button>
              <button onClick={darkMode.setFalse} className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                Set False
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component demonstrating API and debounce hooks
function APIAndDebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  const { data: posts, loading, error, refetch } = useApi(
    debouncedSearchTerm 
      ? `https://jsonplaceholder.typicode.com/posts?q=${debouncedSearchTerm}`
      : 'https://jsonplaceholder.typicode.com/posts?_limit=3'
  )

  // Filter posts based on search term (since API doesn't support search)
  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  ) || []

  return (
    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        🌐 API & Debounce Hooks
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">useApi + useDebounce</h4>
          <div className="space-y-3">
            <div>
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                <span>Search term: "{searchTerm}"</span>
                <span>Debounced: "{debouncedSearchTerm}"</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={refetch}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
              >
                Refetch Data
              </button>
              {loading && <span className="text-green-600">Loading...</span>}
              {error && <span className="text-red-600">Error: {error}</span>}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">
            Results ({filteredPosts.length} posts)
          </h4>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 p-4 text-center">Error: {error}</div>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-3">
              {filteredPosts.map(post => (
                <div key={post.id} className="p-3 bg-green-50 rounded">
                  <h5 className="font-semibold text-green-800">{post.title}</h5>
                  <p className="text-green-700 text-sm">{post.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 p-4 text-center">No posts found</div>
          )}
        </div>
      </div>
    </div>
  )
}

// Component demonstrating form hook
function FormHookDemo() {
  const validationRules = {
    name: [
      (value) => !value ? 'Name is required' : '',
      (value) => value && value.length < 2 ? 'Name must be at least 2 characters' : ''
    ],
    email: [
      (value) => !value ? 'Email is required' : '',
      (value) => value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : ''
    ],
    age: [
      (value) => !value ? 'Age is required' : '',
      (value) => value && (isNaN(value) || parseInt(value) < 1 || parseInt(value) > 120) ? 'Age must be between 1 and 120' : ''
    ]
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useForm(
    { name: '', email: '', age: '' },
    validationRules
  )

  const onSubmit = (formData) => {
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nAge: ${formData.age}`)
    reset()
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        📝 useForm Hook
      </h3>
      
      <div className="bg-white p-4 rounded border">
        <h4 className="font-semibold text-gray-800 mb-4">User Registration Form</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-purple-700 font-medium mb-1">Name:</label>
            <input 
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                touched.name && errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              placeholder="Enter your name"
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-purple-700 font-medium mb-1">Email:</label>
            <input 
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                touched.email && errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-purple-700 font-medium mb-1">Age:</label>
            <input 
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                touched.age && errors.age ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              placeholder="Enter your age"
            />
            {touched.age && errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={handleSubmit(onSubmit)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded font-semibold"
            >
              Submit
            </button>
            <button 
              onClick={reset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-purple-100 rounded">
          <h5 className="font-semibold text-purple-800 mb-2">Form State:</h5>
          <div className="text-sm space-y-1">
            <p className="text-purple-700">Values: {JSON.stringify(values)}</p>
            <p className="text-purple-700">Errors: {JSON.stringify(errors)}</p>
            <p className="text-purple-700">Touched: {JSON.stringify(touched)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Advanced custom hook composition
function useAdvancedTodos() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [filter, setFilter] = useLocalStorage('todoFilter', 'all')
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const addTodo = useCallback((text) => {
    if (!text.trim()) return
    
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos(prev => [newTodo, ...prev])
  }, [setTodos])

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, [setTodos])

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [setTodos])

  const editTodo = useCallback((id, newText) => {
    if (!newText.trim()) return
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ))
  }, [setTodos])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }, [setTodos])

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed)
    
    const matchesSearch = 
      !debouncedSearchTerm || 
      todo.text.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  }

  return {
    todos: filteredTodos,
    stats,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted
  }
}

function AdvancedCustomHookDemo() {
  const {
    todos,
    stats,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted
  } = useAdvancedTodos()

  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const handleAddTodo = () => {
    addTodo(newTodo)
    setNewTodo('')
  }

  const handleEditTodo = (id) => {
    editTodo(id, editingText)
    setEditingId(null)
    setEditingText('')
  }

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingText('')
  }

  return (
    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        🚀 Advanced Custom Hook Composition
      </h3>
      
      <div className="bg-white p-4 rounded border">
        <h4 className="font-semibold text-gray-800 mb-4">Advanced Todo App</h4>
        
        {/* Add Todo */}
        <div className="flex space-x-2 mb-4">
          <input 
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <button 
            onClick={handleAddTodo}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
          >
            Add
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search todos..."
            className="flex-1 min-w-48 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4 p-2 bg-yellow-100 rounded">
          <div className="text-sm text-yellow-700">
            Total: <span className="font-semibold">{stats.total}</span> |
            Active: <span className="font-semibold">{stats.active}</span> |
            Completed: <span className="font-semibold">{stats.completed}</span>
          </div>
          {stats.completed > 0 && (
            <button 
              onClick={clearCompleted}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Clear Completed
            </button>
          )}
        </div>

        {/* Todos List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No todos match your search' : 'No todos yet. Add one above!'}
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                <input 
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                />
                
                {editingId === todo.id ? (
                  <input 
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleEditTodo(todo.id)
                      if (e.key === 'Escape') cancelEditing()
                    }}
                    autoFocus
                  />
                ) : (
                  <span 
                    className={`flex-1 ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
                
                <div className="flex space-x-1">
                  {editingId === todo.id ? (
                    <>
                      <button 
                        onClick={() => handleEditTodo(todo.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        ✓
                      </button>
                      <button 
                        onClick={cancelEditing}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEditing(todo)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// Main App component
function App() {
  const [activeDemo, setActiveDemo] = useState('basic')

  const demos = {
    basic: { component: <BasicCustomHooks />, name: 'Basic Hooks' },
    api: { component: <APIAndDebounceDemo />, name: 'API & Debounce' },
    form: { component: <FormHookDemo />, name: 'Form Hook' },
    advanced: { component: <AdvancedCustomHookDemo />, name: 'Advanced Composition' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 12: Custom Hooks
          </h1>
          <p className="text-lg text-gray-600">
            Creating reusable stateful logic
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎣 Custom Hook Demos
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeDemo === key
                    ? 'bg-indigo-500 text-white'
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
            🎓 Custom Hook Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-indigo-700">
              <li>• Creating reusable stateful logic</li>
              <li>• Hook composition and combination</li>
              <li>• Custom hook naming conventions</li>
              <li>• Extracting component logic</li>
            </ul>
            <ul className="space-y-2 text-indigo-700">
              <li>• useCallback and useMemo optimization</li>
              <li>• Local storage integration</li>
              <li>• API abstraction patterns</li>
              <li>• Form handling automation</li>
            </ul>
          </div>
        </div>

        {/* Custom Hook Benefits */}
        <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500 mb-6">
          <h3 className="text-lg font-semibold text-emerald-800 mb-3">
            ✨ Benefits of Custom Hooks:
          </h3>
          <ul className="space-y-2 text-emerald-700">
            <li>• <strong>Reusability:</strong> Share logic across multiple components</li>
            <li>• <strong>Separation of Concerns:</strong> Keep UI and business logic separate</li>
            <li>• <strong>Testability:</strong> Test logic independently from UI</li>
            <li>• <strong>Composability:</strong> Combine hooks to create complex behaviors</li>
            <li>• <strong>Maintainability:</strong> Update logic in one place</li>
          </ul>
        </div>

        {/* Completion */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-2">🎉 Congratulations!</h3>
          <p className="text-lg mb-4">
            You've completed all 12 steps of the React learning journey!
          </p>
          <div className="flex justify-center space-x-2 mb-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="w-3 h-3 bg-white rounded-full"></div>
            ))}
          </div>
          <p className="text-sm opacity-90">
            You're now ready to build amazing React applications! 🚀
          </p>
        </div>

        {/* Navigation */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 mb-2">Progress: Step 12 of 12 - Complete! 🎯</p>
          <div className="text-sm text-gray-600">
            <p>Ready to start building? Try creating your own React project:</p>
            <code className="bg-gray-200 px-3 py-1 rounded text-sm mt-2 inline-block">
              npm create vite@latest my-app -- --template react
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App