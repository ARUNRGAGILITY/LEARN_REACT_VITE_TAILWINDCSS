import React from 'react'

function App() {
  // JavaScript variables that can be used in JSX
  const studentName = "React Learner"
  const currentStep = 2
  const technologies = ["React", "Vite", "Tailwind CSS"]
  const isLearning = true
  
  // Function that returns JSX
  const getWelcomeMessage = () => {
    return <span className="text-blue-600 font-semibold">Welcome to JSX!</span>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-cyan-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full">
        
        {/* JSX Comments look like this */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step {currentStep}: JSX Fundamentals
          </h1>
          <p className="text-lg text-gray-600">
            {getWelcomeMessage()} Hello, {studentName}!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Embedding JavaScript expressions in JSX */}
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              🔥 JavaScript in JSX
            </h3>
            <div className="space-y-3 text-yellow-700">
              <p>Current step: <strong>{currentStep}</strong></p>
              <p>Student: <strong>{studentName}</strong></p>
              <p>Learning status: <strong>{isLearning ? "Active" : "Inactive"}</strong></p>
              <p>Technologies count: <strong>{technologies.length}</strong></p>
            </div>
          </div>

          {/* Conditional rendering */}
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              ✅ Conditional Rendering
            </h3>
            <div className="space-y-3">
              {isLearning && (
                <p className="text-green-700 font-medium">
                  🎯 You're currently learning!
                </p>
              )}
              
              {technologies.length > 0 ? (
                <p className="text-green-700">
                  📚 Learning {technologies.length} technologies
                </p>
              ) : (
                <p className="text-red-700">No technologies selected</p>
              )}
              
              <div className="text-green-700">
                Status: {isLearning ? 
                  <span className="bg-green-200 px-2 py-1 rounded">Learning</span> : 
                  <span className="bg-red-200 px-2 py-1 rounded">Paused</span>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Rendering lists */}
        <div className="mt-6 bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">
            📋 Rendering Lists
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* JSX attributes and styling */}
        <div className="mt-6 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            🎨 JSX Attributes & Styling
          </h3>
          <div className="space-y-3">
            <div 
              className="p-3 rounded border-2 border-dashed border-blue-300"
              style={{ backgroundColor: '#e0f2fe' }}
            >
              <p className="text-blue-700">
                This div uses both <code className="bg-blue-200 px-1 rounded">className</code> and 
                <code className="bg-blue-200 px-1 rounded ml-1">style</code> attributes
              </p>
            </div>
            
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              onClick={() => alert('JSX event handling works!')}
            >
              Click me! (Event handling)
            </button>
          </div>
        </div>

        {/* Key concepts learned */}
        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📖 Key JSX Concepts Learned:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-700">
              <li>• Embedding JavaScript expressions with {}</li>
              <li>• JSX attributes (className, style, onClick)</li>
              <li>• Conditional rendering with && and ternary</li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li>• Rendering lists with map()</li>
              <li>• JSX comments syntax</li>
              <li>• Fragment usage and rules</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 2 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v3.0-components
          </code>
        </div>
      </div>
    </div>
  )
}

export default App