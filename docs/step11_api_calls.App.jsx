import React, { useState, useEffect } from 'react'

// Basic API call with fetch
function BasicAPICall() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        📡 Basic API Call with Fetch
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Posts from JSONPlaceholder</h4>
          <button 
            onClick={fetchPosts}
            disabled={loading}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              loading 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-blue-600">Fetching posts...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-800 mb-2">{post.title}</h4>
                <p className="text-gray-600 text-sm">{post.body}</p>
                <span className="text-xs text-gray-500">ID: {post.id}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// CRUD Operations
function CRUDOperations() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  // Read - Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      if (!response.ok) throw new Error('Failed to fetch todos')
      
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Create - Add new todo
  const createTodo = async () => {
    if (!newTodo.trim()) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false,
          userId: 1
        })
      })
      
      if (!response.ok) throw new Error('Failed to create todo')
      
      const data = await response.json()
      setTodos(prev => [data, ...prev])
      setNewTodo('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Update - Edit todo
  const updateTodo = async (id, newTitle) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          completed: false,
          userId: 1
        })
      })
      
      if (!response.ok) throw new Error('Failed to update todo')
      
      const data = await response.json()
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, title: data.title } : todo
      ))
      setEditingId(null)
      setEditingText('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Delete - Remove todo
  const deleteTodo = async (id) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete todo')
      
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Toggle completion
  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed })
      })
      
      if (!response.ok) throw new Error('Failed to toggle todo')
      
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ))
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        🔄 CRUD Operations
      </h3>
      
      <div className="space-y-4">
        {/* Create new todo */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Create New Todo</h4>
          <div className="flex space-x-2">
            <input 
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter new todo..."
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={(e) => e.key === 'Enter' && createTodo()}
            />
            <button 
              onClick={createTodo}
              disabled={loading || !newTodo.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-semibold"
            >
              Add
            </button>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span className="ml-2 text-green-600">Processing...</span>
          </div>
        )}

        {/* Todos list */}
        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center space-x-2 p-3 bg-white rounded border">
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
                className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
              
              {editingId === todo.id ? (
                <input 
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') updateTodo(todo.id, editingText)
                    if (e.key === 'Escape') { setEditingId(null); setEditingText('') }
                  }}
                  autoFocus
                />
              ) : (
                <span 
                  className={`flex-1 ${
                    todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {todo.title}
                </span>
              )}
              
              <div className="flex space-x-1">
                {editingId === todo.id ? (
                  <>
                    <button 
                      onClick={() => updateTodo(todo.id, editingText)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      ✓
                    </button>
                    <button 
                      onClick={() => { setEditingId(null); setEditingText('') }}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => { setEditingId(todo.id); setEditingText(todo.title) }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
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
          ))}
        </div>
      </div>
    </div>
  )
}

// Advanced API patterns
function AdvancedAPIPatterns() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cache, setCache] = useState({})
  const [retryCount, setRetryCount] = useState(0)

  // Debounced search with caching
  const searchUsers = async (term) => {
    if (!term.trim()) {
      setSearchResults([])
      return
    }

    // Check cache first
    if (cache[term]) {
      setSearchResults(cache[term])
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${term}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Filter results based on search term (since API doesn't support search)
      const filteredResults = data.filter(user => 
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
      )
      
      setSearchResults(filteredResults)
      
      // Cache the results
      setCache(prev => ({ ...prev, [term]: filteredResults }))
      setRetryCount(0)
      
    } catch (err) {
      setError(err.message)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  // Retry mechanism
  const retrySearch = async () => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1)
      await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
      searchUsers(searchTerm)
    }
  }

  // Debounced search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchUsers(searchTerm)
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  // Simulate network request with progress
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const simulateUpload = async () => {
    setUploading(true)
    setUploadProgress(0)
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }
    
    setUploading(false)
    alert('Upload completed!')
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        ⚡ Advanced API Patterns
      </h3>
      
      <div className="space-y-6">
        {/* Search with caching */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Search with Caching & Debouncing</h4>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
            <span>Cached searches: {Object.keys(cache).length}</span>
            {loading && <span className="text-purple-600">Searching...</span>}
          </div>
          
          {error && (
            <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded">
              <div className="flex items-center justify-between">
                <span>{error}</span>
                {retryCount < 3 && (
                  <button 
                    onClick={retrySearch}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Retry ({retryCount}/3)
                  </button>
                )}
              </div>
            </div>
          )}
          
          {searchResults.length > 0 && (
            <div className="mt-2 space-y-2">
              {searchResults.map(user => (
                <div key={user.id} className="p-2 bg-purple-100 rounded">
                  <div className="font-medium text-purple-800">{user.name}</div>
                  <div className="text-sm text-purple-600">{user.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload progress */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Upload with Progress</h4>
          <button 
            onClick={simulateUpload}
            disabled={uploading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-semibold"
          >
            {uploading ? 'Uploading...' : 'Start Upload'}
          </button>
          
          {uploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Upload Progress</span>
                <span className="text-sm font-medium text-purple-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* API status */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">API Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Cache Size:</span>
              <span className="font-medium">{Object.keys(cache).length} entries</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Retry Count:</span>
              <span className="font-medium">{retryCount}/3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Connection:</span>
              <span className={`font-medium ${error ? 'text-red-600' : 'text-green-600'}`}>
                {error ? 'Error' : 'Connected'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error handling and loading states
function ErrorHandlingDemo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [networkError, setNetworkError] = useState(false)

  const fetchData = async (shouldFail = false) => {
    try {
      setLoading(true)
      setError(null)
      setNetworkError(false)
      
      if (shouldFail) {
        throw new Error('Simulated API failure')
      }
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      setData(result)
      
    } catch (err) {
      setError(err.message)
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setNetworkError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
    </div>
  )

  const ErrorDisplay = ({ error, onRetry }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <div className="flex items-center justify-between">
        <div>
          <strong>Error:</strong> {error}
          {networkError && <div className="text-sm mt-1">Check your internet connection</div>}
        </div>
        <button 
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        🚨 Error Handling & Loading States
      </h3>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => fetchData(false)}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-semibold"
          >
            Load Success
          </button>
          <button 
            onClick={() => fetchData(true)}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-semibold"
          >
            Load Error
          </button>
        </div>

        <div className="bg-white p-4 rounded border min-h-[200px]">
          {loading && <LoadingSpinner />}
          
          {error && !loading && (
            <ErrorDisplay 
              error={error} 
              onRetry={() => fetchData(false)} 
            />
          )}
          
          {data && !loading && !error && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{data.title}</h4>
              <p className="text-gray-600">{data.body}</p>
              <div className="mt-2 text-sm text-gray-500">
                User ID: {data.userId} | Post ID: {data.id}
              </div>
            </div>
          )}
          
          {!loading && !error && !data && (
            <div className="flex items-center justify-center h-32 text-gray-500">
              Click a button to load data
            </div>
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
    basic: { component: <BasicAPICall />, name: 'Basic API Call' },
    crud: { component: <CRUDOperations />, name: 'CRUD Operations' },
    advanced: { component: <AdvancedAPIPatterns />, name: 'Advanced Patterns' },
    error: { component: <ErrorHandlingDemo />, name: 'Error Handling' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 11: API Calls
          </h1>
          <p className="text-lg text-gray-600">
            Fetching and managing external data
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🌐 API Integration Demos
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeDemo === key
                    ? 'bg-sky-500 text-white'
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
        <div className="bg-sky-50 p-6 rounded-lg border-l-4 border-sky-500 mb-6">
          <h3 className="text-lg font-semibold text-sky-800 mb-3">
            🎓 API Integration Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sky-700">
              <li>• Fetch API and async/await</li>
              <li>• GET, POST, PUT, DELETE requests</li>
              <li>• Error handling and status codes</li>
              <li>• Loading states and user feedback</li>
            </ul>
            <ul className="space-y-2 text-sky-700">
              <li>• Request caching and optimization</li>
              <li>• Retry mechanisms and resilience</li>
              <li>• Progress indicators</li>
              <li>• Debouncing and throttling</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            💡 API Best Practices:
          </h3>
          <ul className="space-y-2 text-amber-700">
            <li>• Always handle errors gracefully</li>
            <li>• Show loading states for better UX</li>
            <li>• Use proper HTTP methods for different operations</li>
            <li>• Implement caching for frequently accessed data</li>
            <li>• Use debouncing for search and real-time features</li>
            <li>• Provide retry mechanisms for failed requests</li>
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
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 11 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v12.0-custom-hooks
          </code>
        </div>
      </div>
    </div>
  )
}

export default App