import React, { useState, useEffect } from 'react'

// Basic useEffect examples
function BasicEffects() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [renderCount, setRenderCount] = useState(0)

  // Effect that runs after every render
  useEffect(() => {
    setRenderCount(prev => prev + 1)
  })

  // Effect that runs only once (on mount)
  useEffect(() => {
    console.log('Component mounted!')
    document.title = 'useEffect Demo'
  }, [])

  // Effect that runs when count changes
  useEffect(() => {
    console.log('Count changed to:', count)
  }, [count])

  // Effect that runs when name changes
  useEffect(() => {
    if (name) {
      console.log('Name changed to:', name)
    }
  }, [name])

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        🔄 Basic useEffect Examples
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Render Counter</h4>
          <p className="text-blue-600">Component has rendered {renderCount} times</p>
          <p className="text-sm text-gray-600">This effect runs after every render (no dependency array)</p>
        </div>

        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Count Effect</h4>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCount(count - 1)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              -
            </button>
            <span className="text-xl font-bold text-blue-600">{count}</span>
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">Effect runs when count changes</p>
        </div>

        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Name Effect</h4>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-600 mt-2">Effect runs when name changes</p>
        </div>

        <div className="p-3 bg-blue-100 rounded">
          <p className="text-blue-700 text-sm">
            <strong>Check the console</strong> to see effect logs when values change!
          </p>
        </div>
      </div>
    </div>
  )
}

// Effect with cleanup
function EffectWithCleanup() {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Timer effect with cleanup
  useEffect(() => {
    let interval = null
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isTimerRunning])

  // Window resize listener with cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setSeconds(0)
  }

  return (
    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        🧹 Effects with Cleanup
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Timer with Cleanup</h4>
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-green-600 mb-4">
              {Math.floor(seconds / 60).toString().padStart(2, '0')}:
              {(seconds % 60).toString().padStart(2, '0')}
            </div>
            <div className="space-x-2">
              <button 
                onClick={toggleTimer}
                className={`px-4 py-2 rounded font-semibold ${
                  isTimerRunning 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button 
                onClick={resetTimer}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Timer uses setInterval and cleans up with clearInterval
          </p>
        </div>

        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Window Resize Listener</h4>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {windowWidth}px
            </div>
            <p className="text-sm text-gray-600">
              Resize your window to see this update
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Effect adds event listener and cleans up by removing it
          </p>
        </div>
      </div>
    </div>
  )
}

// Data fetching with useEffect
function DataFetching() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  // Simulate API call
  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate API response
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'London' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', city: 'Tokyo' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', city: 'Paris' }
      ]
      
      setUsers(mockUsers)
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  // Effect to fetch data on mount
  useEffect(() => {
    fetchUsers()
  }, [])

  // Effect to fetch user details when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      console.log('Fetching details for user:', selectedUser.name)
      // In real app, you might fetch additional user details here
    }
  }, [selectedUser])

  return (
    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        📡 Data Fetching with useEffect
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Users List</h4>
          <button 
            onClick={fetchUsers}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-semibold"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-2 text-purple-600">Loading users...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map(user => (
              <div 
                key={user.id} 
                className={`p-4 rounded border cursor-pointer transition-all ${
                  selectedUser?.id === user.id 
                    ? 'bg-purple-100 border-purple-500' 
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-500 text-xs">{user.city}</p>
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="p-4 bg-purple-100 rounded border">
            <h4 className="font-semibold text-purple-800 mb-2">Selected User Details</h4>
            <p className="text-purple-700"><strong>Name:</strong> {selectedUser.name}</p>
            <p className="text-purple-700"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="text-purple-700"><strong>City:</strong> {selectedUser.city}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Multiple effects and dependencies
function MultipleEffects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState({ name: 'John', preferences: { theme: 'light' } })

  // Mock search function
  const searchItems = async (term) => {
    setIsSearching(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const mockResults = [
      'React Documentation',
      'React Router',
      'React Query',
      'React Testing Library',
      'React Native'
    ].filter(item => item.toLowerCase().includes(term.toLowerCase()))
    
    setResults(mockResults)
    setIsSearching(false)
  }

  // Effect for search with debouncing
  useEffect(() => {
    if (searchTerm) {
      const debounceTimer = setTimeout(() => {
        searchItems(searchTerm)
      }, 500)

      return () => clearTimeout(debounceTimer)
    } else {
      setResults([])
    }
  }, [searchTerm])

  // Effect for theme changes
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme'
    
    return () => {
      document.body.className = ''
    }
  }, [theme])

  // Effect for user preference sync
  useEffect(() => {
    if (user.preferences.theme !== theme) {
      setUser(prev => ({
        ...prev,
        preferences: { ...prev.preferences, theme }
      }))
    }
  }, [theme, user.preferences.theme])

  // Effect for localStorage sync
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        🔀 Multiple Effects & Dependencies
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Search with Debouncing</h4>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search React resources..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          
          {isSearching && (
            <div className="mt-2 text-yellow-600">Searching...</div>
          )}
          
          {results.length > 0 && (
            <div className="mt-2 space-y-1">
              {results.map((result, index) => (
                <div key={index} className="p-2 bg-yellow-100 rounded text-yellow-800">
                  {result}
                </div>
              ))}
            </div>
          )}
          
          <p className="text-sm text-gray-600 mt-2">
            Search is debounced by 500ms to avoid excessive API calls
          </p>
        </div>

        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Theme Management</h4>
          <div className="flex space-x-2">
            <button 
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded ${
                theme === 'light' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded ${
                theme === 'dark' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Dark
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Theme syncs with localStorage and user preferences
          </p>
        </div>

        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">User Preferences</h4>
          <div className="text-sm">
            <p className="text-gray-700">User: {user.name}</p>
            <p className="text-gray-700">Theme Preference: {user.preferences.theme}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App component
function App() {
  const [activeDemo, setActiveDemo] = useState('basic')

  const demos = {
    basic: { component: <BasicEffects />, name: 'Basic Effects' },
    cleanup: { component: <EffectWithCleanup />, name: 'Effect Cleanup' },
    fetching: { component: <DataFetching />, name: 'Data Fetching' },
    multiple: { component: <MultipleEffects />, name: 'Multiple Effects' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 10: useEffect Hook
          </h1>
          <p className="text-lg text-gray-600">
            Managing side effects and lifecycle
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            ⚡ useEffect Demos
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeDemo === key
                    ? 'bg-pink-500 text-white'
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
        <div className="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500 mb-6">
          <h3 className="text-lg font-semibold text-pink-800 mb-3">
            🎓 useEffect Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-pink-700">
              <li>• Basic useEffect syntax</li>
              <li>• Dependency arrays</li>
              <li>• Effect cleanup functions</li>
              <li>• Data fetching patterns</li>
            </ul>
            <ul className="space-y-2 text-pink-700">
              <li>• Event listeners and cleanup</li>
              <li>• Multiple effects in one component</li>
              <li>• Effect optimization</li>
              <li>• Common effect patterns</li>
            </ul>
          </div>
        </div>

        {/* useEffect Rules */}
        <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            📋 useEffect Rules & Best Practices:
          </h3>
          <ul className="space-y-2 text-amber-700">
            <li>• Always include dependencies in the dependency array</li>
            <li>• Use cleanup functions to prevent memory leaks</li>
            <li>• Empty dependency array [] runs effect only once</li>
            <li>• No dependency array runs effect after every render</li>
            <li>• Use multiple effects to separate concerns</li>
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
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 10 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v11.0-api-calls
          </code>
        </div>
      </div>
    </div>
  )
}

export default App