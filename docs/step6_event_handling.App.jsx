import React, { useState } from 'react'

// Basic event handling
function BasicEvents() {
  const [message, setMessage] = useState('')
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    setClickCount(prev => prev + 1)
    setMessage(`Button clicked ${clickCount + 1} times!`)
  }

  const handleDoubleClick = () => {
    setMessage('Double clicked! 🎯')
  }

  const handleMouseEnter = () => {
    setMessage('Mouse entered the button area 🖱️')
  }

  const handleMouseLeave = () => {
    setMessage('Mouse left the button area 👋')
  }

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        🖱️ Basic Event Handling
      </h3>
      <div className="space-y-4">
        <button 
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-semibold transition-colors"
        >
          Interactive Button (Click Count: {clickCount})
        </button>
        <div className="p-3 bg-blue-100 rounded">
          <p className="text-blue-700">{message || 'Interact with the button above!'}</p>
        </div>
      </div>
    </div>
  )
}

// Event object and preventDefault
function FormEvents() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submissions, setSubmissions] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission
    
    if (formData.name && formData.email) {
      const newSubmission = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toLocaleTimeString()
      }
      setSubmissions(prev => [...prev, newSubmission])
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const handleReset = (e) => {
    e.preventDefault()
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        📝 Form Events & preventDefault
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-green-700 font-medium mb-1">Name:</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-green-700 font-medium mb-1">Email:</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-green-700 font-medium mb-1">Message:</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Enter your message"
            rows="3"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
          >
            Submit
          </button>
          <button 
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
      
      {submissions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-green-800 mb-2">Submissions:</h4>
          <div className="space-y-2">
            {submissions.map(sub => (
              <div key={sub.id} className="p-3 bg-green-100 rounded">
                <p className="text-green-800">
                  <strong>{sub.name}</strong> ({sub.email}) - {sub.timestamp}
                </p>
                {sub.message && <p className="text-green-700 text-sm">{sub.message}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Keyboard events
function KeyboardEvents() {
  const [keyInfo, setKeyInfo] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [shortcuts, setShortcuts] = useState([])

  const handleKeyDown = (e) => {
    const keyInfo = {
      key: e.key,
      code: e.code,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey
    }
    
    setKeyInfo(`Key: ${keyInfo.key} | Code: ${keyInfo.code} | Ctrl: ${keyInfo.ctrlKey} | Shift: ${keyInfo.shiftKey}`)
    
    // Handle shortcuts
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      setShortcuts(prev => [...prev, `Ctrl+S pressed at ${new Date().toLocaleTimeString()}`])
    }
    
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      setShortcuts(prev => [...prev, `Shift+Enter pressed at ${new Date().toLocaleTimeString()}`])
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Escape') {
      setInputValue('')
      setKeyInfo('Input cleared with Escape key!')
    }
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        ⌨️ Keyboard Events
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-purple-700 font-medium mb-2">
            Type here (Try Ctrl+S, Shift+Enter, Escape):
          </label>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            placeholder="Type something and try keyboard shortcuts..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="p-3 bg-purple-100 rounded">
          <p className="text-purple-700 text-sm">
            {keyInfo || 'Press any key to see key information'}
          </p>
        </div>
        
        {shortcuts.length > 0 && (
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Shortcuts Detected:</h4>
            <div className="space-y-1">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="text-sm text-purple-700 bg-purple-100 p-2 rounded">
                  {shortcut}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Event delegation and dynamic events
function DynamicEvents() {
  const [buttons, setButtons] = useState([
    { id: 1, label: 'Button 1', clicks: 0 },
    { id: 2, label: 'Button 2', clicks: 0 },
    { id: 3, label: 'Button 3', clicks: 0 }
  ])

  const addButton = () => {
    const newButton = {
      id: Date.now(),
      label: `Button ${buttons.length + 1}`,
      clicks: 0
    }
    setButtons(prev => [...prev, newButton])
  }

  const handleButtonClick = (id) => {
    setButtons(prev => prev.map(btn => 
      btn.id === id ? { ...btn, clicks: btn.clicks + 1 } : btn
    ))
  }

  const removeButton = (id) => {
    setButtons(prev => prev.filter(btn => btn.id !== id))
  }

  return (
    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        🎯 Dynamic Event Handling
      </h3>
      <div className="space-y-4">
        <button 
          onClick={addButton}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
        >
          Add Button
        </button>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {buttons.map(button => (
            <div key={button.id} className="p-3 bg-yellow-100 rounded">
              <button 
                onClick={() => handleButtonClick(button.id)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded mb-2 font-semibold"
              >
                {button.label}
              </button>
              <p className="text-sm text-yellow-700 text-center">
                Clicks: {button.clicks}
              </p>
              <button 
                onClick={() => removeButton(button.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs mt-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Event propagation
function EventPropagation() {
  const [eventLog, setEventLog] = useState([])

  const addToLog = (message) => {
    setEventLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleParentClick = () => {
    addToLog('Parent div clicked')
  }

  const handleChildClick = (e) => {
    addToLog('Child button clicked')
    // Uncomment to stop propagation
    // e.stopPropagation()
  }

  const handleChildClickStop = (e) => {
    e.stopPropagation()
    addToLog('Child button clicked (propagation stopped)')
  }

  const clearLog = () => {
    setEventLog([])
  }

  return (
    <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
      <h3 className="text-lg font-semibold text-red-800 mb-4">
        🔄 Event Propagation
      </h3>
      <div className="space-y-4">
        <div 
          onClick={handleParentClick}
          className="p-6 bg-red-100 border-2 border-red-300 rounded cursor-pointer"
        >
          <p className="text-red-700 mb-4">Parent Container (Click me too!)</p>
          <div className="flex space-x-4">
            <button 
              onClick={handleChildClick}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
            >
              Child Button (Bubbles)
            </button>
            <button 
              onClick={handleChildClickStop}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-semibold"
            >
              Child Button (No Bubble)
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-red-800">Event Log:</h4>
          <button 
            onClick={clearLog}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
          >
            Clear Log
          </button>
        </div>
        
        <div className="bg-red-100 p-3 rounded max-h-32 overflow-y-auto">
          {eventLog.length === 0 ? (
            <p className="text-red-600 text-sm">Click the buttons above to see event propagation</p>
          ) : (
            eventLog.map((log, index) => (
              <p key={index} className="text-red-700 text-sm">{log}</p>
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
    basic: { component: <BasicEvents />, name: 'Basic Events' },
    forms: { component: <FormEvents />, name: 'Form Events' },
    keyboard: { component: <KeyboardEvents />, name: 'Keyboard Events' },
    dynamic: { component: <DynamicEvents />, name: 'Dynamic Events' },
    propagation: { component: <EventPropagation />, name: 'Event Propagation' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-5xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 6: Event Handling
          </h1>
          <p className="text-lg text-gray-600">
            Mastering user interactions and events
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎮 Event Handling Demos
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
            🎓 Event Handling Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-indigo-700">
              <li>• onClick, onDoubleClick, onMouseEnter/Leave</li>
              <li>• Form events (onSubmit, onChange)</li>
              <li>• Keyboard events (onKeyDown, onKeyUp)</li>
              <li>• Event object properties</li>
            </ul>
            <ul className="space-y-2 text-indigo-700">
              <li>• preventDefault() method</li>
              <li>• stopPropagation() method</li>
              <li>• Event delegation patterns</li>
              <li>• Dynamic event handlers</li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 6 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v7.0-lists-keys
          </code>
        </div>
      </div>
    </div>
  )
}

export default App