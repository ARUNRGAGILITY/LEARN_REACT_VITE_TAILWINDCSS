import React from 'react'

// Simple functional component
function Header() {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Step 3: React Components
      </h1>
      <p className="text-lg text-gray-600">
        Building reusable UI pieces
      </p>
    </header>
  )
}

// Component with internal logic
function StepCounter() {
  const currentStep = 3
  const totalSteps = 12
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">
        📊 Progress Tracker Component
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-blue-700">
          <span>Current Step: {currentStep}</span>
          <span>Total Steps: {totalSteps}</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-blue-600">{progress.toFixed(1)}% Complete</p>
      </div>
    </div>
  )
}

// Component that renders other components
function ConceptCard({ title, emoji, concepts, bgColor = "gray" }) {
  return (
    <div className={`bg-${bgColor}-50 p-6 rounded-lg border-l-4 border-${bgColor}-500`}>
      <h3 className={`text-lg font-semibold text-${bgColor}-800 mb-3`}>
        {emoji} {title}
      </h3>
      <ul className={`space-y-2 text-${bgColor}-700`}>
        {concepts.map((concept, index) => (
          <li key={index}>• {concept}</li>
        ))}
      </ul>
    </div>
  )
}

// Component with conditional rendering
function StatusBadge({ isActive }) {
  if (isActive) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        Active Learning
      </span>
    )
  }
  
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
      <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
      Paused
    </span>
  )
}

// Component with event handling
function InteractiveButton() {
  const handleClick = () => {
    alert('Component button clicked! 🎉')
  }

  return (
    <button 
      onClick={handleClick}
      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
    >
      Click Me! (Component Event)
    </button>
  )
}

// Component that demonstrates composition
function LearningStats() {
  const stats = [
    { label: "Components Created", value: "5+", color: "blue" },
    { label: "Concepts Learned", value: "8", color: "green" },
    { label: "Code Reusability", value: "High", color: "purple" }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-${stat.color}-50 p-4 rounded-lg text-center`}>
          <div className={`text-2xl font-bold text-${stat.color}-600`}>
            {stat.value}
          </div>
          <div className={`text-sm text-${stat.color}-800`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// Main App component that uses all other components
function App() {
  const componentConcepts = [
    "Functional components",
    "Component composition",
    "Reusable UI pieces",
    "Clean code organization"
  ]

  const jsxConcepts = [
    "JSX expressions in components",
    "Component nesting",
    "Event handling in components",
    "Conditional component rendering"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full">
        
        {/* Using the Header component */}
        <Header />

        {/* Using the StepCounter component */}
        <div className="mb-6">
          <StepCounter />
        </div>

        {/* Status badge component */}
        <div className="mb-6 flex items-center justify-center">
          <StatusBadge isActive={true} />
        </div>

        {/* Grid of concept cards using ConceptCard component */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ConceptCard 
            title="React Components"
            emoji="🧩"
            concepts={componentConcepts}
            bgColor="green"
          />
          <ConceptCard 
            title="Component Features"
            emoji="⚡"
            concepts={jsxConcepts}
            bgColor="orange"
          />
        </div>

        {/* Learning stats component */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            📈 Learning Statistics
          </h3>
          <LearningStats />
        </div>

        {/* Interactive component */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎯 Interactive Component
          </h3>
          <InteractiveButton />
        </div>

        {/* Component hierarchy visualization */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🌳 Component Hierarchy
          </h3>
          <div className="font-mono text-sm text-gray-600 space-y-1">
            <div>App (Main Component)</div>
            <div className="ml-4">├── Header</div>
            <div className="ml-4">├── StepCounter</div>
            <div className="ml-4">├── StatusBadge</div>
            <div className="ml-4">├── ConceptCard (×2)</div>
            <div className="ml-4">├── LearningStats</div>
            <div className="ml-4">└── InteractiveButton</div>
          </div>
        </div>

        {/* Key concepts learned */}
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            🎓 Component Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-yellow-700">
              <li>• Creating functional components</li>
              <li>• Component composition and nesting</li>
              <li>• Passing data between components</li>
              <li>• Component reusability</li>
            </ul>
            <ul className="space-y-2 text-yellow-700">
              <li>• Event handling in components</li>
              <li>• Conditional rendering</li>
              <li>• Component organization</li>
              <li>• Building component hierarchies</li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 3 of 12</p>
          <div className="space-y-2">
            <div>
              <code className="bg-gray-200 px-3 py-1 rounded text-sm mr-2">
                git checkout v4.0-props
              </code>
              <span className="text-gray-600">→ Learn about Props</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App