import React, { useState } from 'react'

// Basic conditional rendering
function BasicConditionals() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: 'John Doe', role: 'admin' })

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        ✅ Basic Conditional Rendering
      </h3>
      
      <div className="space-y-4">
        {/* If-else with ternary operator */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Ternary Operator:</h4>
          <div className="mb-3">
            {isLoggedIn ? (
              <div className="text-green-600">
                ✅ Welcome back, {user.name}!
              </div>
            ) : (
              <div className="text-red-600">
                ❌ Please log in to continue
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              isLoggedIn 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Logical AND operator */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Logical AND (&&):</h4>
          {isLoggedIn && (
            <div className="bg-green-100 p-3 rounded">
              <p className="text-green-800">
                🎉 You have access to the dashboard!
              </p>
            </div>
          )}
          {!isLoggedIn && (
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-gray-600">
                Login to see your dashboard
              </p>
            </div>
          )}
        </div>

        {/* Role-based conditional rendering */}
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Role-based Access:</h4>
          {isLoggedIn && user.role === 'admin' && (
            <div className="bg-purple-100 p-3 rounded">
              <p className="text-purple-800">
                🔧 Admin Panel Available
              </p>
            </div>
          )}
          {isLoggedIn && user.role !== 'admin' && (
            <div className="bg-blue-100 p-3 rounded">
              <p className="text-blue-800">
                👤 User Dashboard
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Complex conditional rendering
function ComplexConditionals() {
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const simulateDataFetch = (outcome) => {
    setStatus('loading')
    setError(null)
    setData(null)

    setTimeout(() => {
      if (outcome === 'success') {
        setStatus('success')
        setData({
          id: 1,
          title: 'Sample Data',
          description: 'This is some sample data from the API',
          items: ['Item 1', 'Item 2', 'Item 3']
        })
      } else if (outcome === 'error') {
        setStatus('error')
        setError('Failed to fetch data from the server')
      } else {
        setStatus('empty')
      }
    }, 1500)
  }

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-green-600">Loading...</span>
        </div>
      )
    }

    if (status === 'error') {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error!</strong> {error}
        </div>
      )
    }

    if (status === 'empty') {
      return (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <strong>No Data!</strong> No items found.
        </div>
      )
    }

    if (status === 'success' && data) {
      return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <h4 className="font-semibold">{data.title}</h4>
          <p className="text-sm">{data.description}</p>
          <ul className="mt-2 text-sm">
            {data.items.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      )
    }

    return null
  }

  return (
    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        🔄 Complex Conditional Rendering
      </h3>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => simulateDataFetch('success')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
          >
            Load Success
          </button>
          <button 
            onClick={() => simulateDataFetch('error')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
          >
            Load Error
          </button>
          <button 
            onClick={() => simulateDataFetch('empty')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
          >
            Load Empty
          </button>
        </div>

        <div className="min-h-[120px]">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

// Conditional styling
function ConditionalStyling() {
  const [theme, setTheme] = useState('light')
  const [size, setSize] = useState('medium')
  const [isHighlighted, setIsHighlighted] = useState(false)

  const getButtonClass = () => {
    const baseClass = 'px-6 py-3 rounded font-semibold transition-all duration-200'
    
    const themeClass = theme === 'dark' 
      ? 'bg-gray-800 text-white hover:bg-gray-700' 
      : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'
    
    const sizeClass = {
      small: 'text-sm px-4 py-2',
      medium: 'text-base px-6 py-3',
      large: 'text-lg px-8 py-4'
    }[size]
    
    const highlightClass = isHighlighted 
      ? 'ring-4 ring-blue-300 ring-opacity-50' 
      : ''
    
    return `${baseClass} ${themeClass} ${sizeClass} ${highlightClass}`
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        🎨 Conditional Styling
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-purple-700 font-medium mb-2">Theme:</label>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          
          <div>
            <label className="block text-purple-700 font-medium mb-2">Size:</label>
            <select 
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          
          <div className="col-span-2">
            <label className="flex items-center space-x-2 mt-6">
              <input 
                type="checkbox"
                checked={isHighlighted}
                onChange={(e) => setIsHighlighted(e.target.checked)}
                className="w-4 h-4 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-purple-700">Highlight</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center py-8">
          <button className={getButtonClass()}>
            Dynamic Styled Button
          </button>
        </div>

        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold text-gray-800 mb-2">Generated Classes:</h4>
          <code className="text-sm text-gray-600 break-all">
            {getButtonClass()}
          </code>
        </div>
      </div>
    </div>
  )
}

// Conditional lists and components
function ConditionalLists() {
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  
  const items = [
    { id: 1, name: 'React', type: 'frontend', difficulty: 'medium', active: true },
    { id: 2, name: 'Node.js', type: 'backend', difficulty: 'hard', active: true },
    { id: 3, name: 'MongoDB', type: 'database', difficulty: 'easy', active: false },
    { id: 4, name: 'Express', type: 'backend', difficulty: 'medium', active: true },
    { id: 5, name: 'Vue.js', type: 'frontend', difficulty: 'easy', active: false }
  ]

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true
    if (filter === 'active') return item.active
    if (filter === 'inactive') return !item.active
    return item.type === filter
  })

  const GridView = ({ items }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item.id} className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-gray-800">{item.name}</h4>
          <p className="text-sm text-gray-600">{item.type}</p>
          <div className="flex items-center justify-between mt-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              item.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              item.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {item.difficulty}
            </span>
            <span className={`w-3 h-3 rounded-full ${
              item.active ? 'bg-green-500' : 'bg-gray-400'
            }`}></span>
          </div>
        </div>
      ))}
    </div>
  )

  const ListView = ({ items }) => (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded border">
          <div className="flex items-center space-x-3">
            <span className={`w-3 h-3 rounded-full ${
              item.active ? 'bg-green-500' : 'bg-gray-400'
            }`}></span>
            <span className="font-medium text-gray-800">{item.name}</span>
            <span className="text-sm text-gray-600">({item.type})</span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            item.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            item.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {item.difficulty}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        📋 Conditional Lists & Components
      </h3>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-yellow-700 font-medium mb-2">Filter:</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="all">All Items</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
            </select>
          </div>
          
          <div>
            <label className="block text-yellow-700 font-medium mb-2">View:</label>
            <select 
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">
              {viewMode === 'grid' ? 'Grid View' : 'List View'}
            </h4>
            <span className="text-sm text-gray-600">
              {filteredItems.length} items
            </span>
          </div>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items match the current filter
            </div>
          ) : (
            viewMode === 'grid' ? 
              <GridView items={filteredItems} /> : 
              <ListView items={filteredItems} />
          )}
        </div>
      </div>
    </div>
  )
}

// Nested conditional rendering
function NestedConditionals() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    profile: null,
    subscription: null,
    notifications: []
  })

  const login = () => {
    setUser({
      isLoggedIn: true,
      profile: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      subscription: {
        type: 'premium',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      notifications: [
        { id: 1, type: 'info', message: 'Welcome back!' },
        { id: 2, type: 'warning', message: 'Your subscription expires in 30 days' }
      ]
    })
  }

  const logout = () => {
    setUser({
      isLoggedIn: false,
      profile: null,
      subscription: null,
      notifications: []
    })
  }

  return (
    <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
      <h3 className="text-lg font-semibold text-red-800 mb-4">
        🔗 Nested Conditional Rendering
      </h3>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button 
            onClick={login}
            disabled={user.isLoggedIn}
            className={`px-4 py-2 rounded font-semibold ${
              user.isLoggedIn 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Login
          </button>
          <button 
            onClick={logout}
            disabled={!user.isLoggedIn}
            className={`px-4 py-2 rounded font-semibold ${
              !user.isLoggedIn 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-4 rounded border min-h-[200px]">
          {user.isLoggedIn ? (
            <div className="space-y-4">
              {/* User Profile Section */}
              {user.profile && (
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded">
                  <img 
                    src={user.profile.avatar} 
                    alt={user.profile.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{user.profile.name}</h4>
                    <p className="text-sm text-gray-600">{user.profile.email}</p>
                  </div>
                </div>
              )}

              {/* Subscription Section */}
              {user.subscription && (
                <div className="p-3 bg-blue-50 rounded">
                  <h4 className="font-semibold text-blue-800">Subscription Status</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.subscription.type === 'premium' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.subscription.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      Expires: {user.subscription.expiresAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {user.notifications && user.notifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Notifications</h4>
                  {user.notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 rounded border-l-4 ${
                        notification.type === 'info' ? 'bg-blue-50 border-blue-500' :
                        notification.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                        notification.type === 'error' ? 'bg-red-50 border-red-500' :
                        'bg-gray-50 border-gray-500'
                      }`}
                    >
                      <p className={`text-sm ${
                        notification.type === 'info' ? 'text-blue-700' :
                        notification.type === 'warning' ? 'text-yellow-700' :
                        notification.type === 'error' ? 'text-red-700' :
                        'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-gray-600">Please log in to view your dashboard</p>
              </div>
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
    basic: { component: <BasicConditionals />, name: 'Basic Conditionals' },
    complex: { component: <ComplexConditionals />, name: 'Complex Conditionals' },
    styling: { component: <ConditionalStyling />, name: 'Conditional Styling' },
    lists: { component: <ConditionalLists />, name: 'Conditional Lists' },
    nested: { component: <NestedConditionals />, name: 'Nested Conditionals' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 8: Conditional Rendering
          </h1>
          <p className="text-lg text-gray-600">
            Dynamic UI based on state and conditions
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎯 Conditional Rendering Demos
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeDemo === key
                    ? 'bg-emerald-500 text-white'
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
        <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500 mb-6">
          <h3 className="text-lg font-semibold text-emerald-800 mb-3">
            🎓 Conditional Rendering Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-emerald-700">
              <li>• Ternary operator (condition ? true : false)</li>
              <li>• Logical AND operator (&&)</li>
              <li>• If-else statements in functions</li>
              <li>• Conditional styling with classes</li>
            </ul>
            <ul className="space-y-2 text-emerald-700">
              <li>• Multiple condition handling</li>
              <li>• Nested conditional rendering</li>
              <li>• Conditional lists and components</li>
              <li>• Loading states and error handling</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            💡 Best Practices:
          </h3>
          <ul className="space-y-2 text-amber-700">
            <li>• Use ternary for simple if-else conditions</li>
            <li>• Use && for showing/hiding elements</li>
            <li>• Extract complex conditions into functions</li>
            <li>• Handle loading and error states gracefully</li>
            <li>• Avoid deeply nested conditionals</li>
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
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 8 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v9.0-forms
          </code>
        </div>
      </div>
    </div>
  )
}

export default App