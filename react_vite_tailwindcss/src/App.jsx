import React from 'react'

// Component with basic props
function Greeting({ name, age, isStudent }) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">
        👋 Basic Props Example
      </h3>
      <p className="text-blue-700">
        Hello, {name}! You are {age} years old
        {isStudent ? ' and you are a student.' : ' and you are not a student.'}
      </p>
    </div>
  )
}

// Component with props destructuring
function UserCard({ user: { name, email, role, avatar }, isOnline = false }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {isOnline && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
          <p className="text-gray-600">{email}</p>
          <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
            {role}
          </span>
        </div>
      </div>
    </div>
  )
}

// Component with default props
function Badge({ text, variant = 'primary', size = 'medium' }) {
  const variants = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-500 text-white'
  }

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  }

  return (
    <span className={`inline-block rounded-full font-semibold ${variants[variant]} ${sizes[size]}`}>
      {text}
    </span>
  )
}

// Component with function props (callbacks)
function Counter({ initialValue = 0, onCountChange }) {
  const [count, setCount] = React.useState(initialValue)

  const increment = () => {
    const newCount = count + 1
    setCount(newCount)
    onCountChange && onCountChange(newCount)
  }

  const decrement = () => {
    const newCount = count - 1
    setCount(newCount)
    onCountChange && onCountChange(newCount)
  }

  return (
    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
      <h4 className="text-lg font-semibold text-green-800 mb-3">
        🔢 Counter with Callback Props
      </h4>
      <div className="flex items-center space-x-4">
        <button 
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          -
        </button>
        <span className="text-2xl font-bold text-green-700">{count}</span>
        <button 
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          +
        </button>
      </div>
    </div>
  )
}

// Component with children prop
function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md border ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  )
}

// Component with array props
function SkillList({ skills, maxDisplay = 5 }) {
  const displayedSkills = skills.slice(0, maxDisplay)
  const remainingCount = skills.length - maxDisplay

  return (
    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
      <h4 className="text-lg font-semibold text-purple-800 mb-3">
        🎯 Skills (Array Props)
      </h4>
      <div className="flex flex-wrap gap-2">
        {displayedSkills.map((skill, index) => (
          <Badge key={index} text={skill} variant="primary" size="small" />
        ))}
        {remainingCount > 0 && (
          <Badge text={`+${remainingCount} more`} variant="secondary" size="small" />
        )}
      </div>
    </div>
  )
}

// Component with conditional props
function StatusIndicator({ status, message, showIcon = true }) {
  const statusConfig = {
    success: { color: 'green', icon: '✅' },
    warning: { color: 'yellow', icon: '⚠️' },
    error: { color: 'red', icon: '❌' },
    info: { color: 'blue', icon: 'ℹ️' }
  }

  const config = statusConfig[status] || statusConfig.info

  return (
    <div className={`bg-${config.color}-50 p-4 rounded-lg border-l-4 border-${config.color}-500`}>
      <div className="flex items-center space-x-2">
        {showIcon && <span className="text-lg">{config.icon}</span>}
        <p className={`text-${config.color}-700 font-medium`}>{message}</p>
      </div>
    </div>
  )
}

// Main App component demonstrating all prop patterns
function App() {
  const [counterValue, setCounterValue] = React.useState(0)

  const sampleUser = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "React Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }

  const skillsList = [
    "React", "JavaScript", "TypeScript", "Tailwind CSS", 
    "Node.js", "Express", "MongoDB", "Git", "AWS"
  ]

  const handleCounterChange = (newValue) => {
    setCounterValue(newValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 4: Props Deep Dive
          </h1>
          <p className="text-lg text-gray-600">
            Mastering component communication
          </p>
        </div>

        {/* Basic Props */}
        <div className="mb-6">
          <Greeting name="Sarah" age={25} isStudent={true} />
        </div>

        {/* Object Props with Destructuring */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            👤 User Card (Object Props)
          </h3>
          <UserCard user={sampleUser} isOnline={true} />
        </div>

        {/* Default Props */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🏷️ Badges (Default Props)
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge text="Primary" />
            <Badge text="Success" variant="success" />
            <Badge text="Warning" variant="warning" />
            <Badge text="Large Badge" size="large" />
            <Badge text="Small" variant="danger" size="small" />
          </div>
        </div>

        {/* Function Props */}
        <div className="mb-6">
          <Counter initialValue={5} onCountChange={handleCounterChange} />
          <div className="mt-2 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              Counter value received by parent: <strong>{counterValue}</strong>
            </p>
          </div>
        </div>

        {/* Children Props */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📦 Card with Children Props
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card title="With Title">
              <p className="text-gray-600">
                This content is passed as children to the Card component.
              </p>
            </Card>
            <Card className="border-blue-200">
              <p className="text-gray-600">
                This card has no title but includes custom className.
              </p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Button inside card
              </button>
            </Card>
          </div>
        </div>

        {/* Array Props */}
        <div className="mb-6">
          <SkillList skills={skillsList} maxDisplay={6} />
        </div>

        {/* Conditional Props */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🚦 Status Indicators (Conditional Props)
          </h3>
          <div className="space-y-3">
            <StatusIndicator 
              status="success" 
              message="Props are working perfectly!" 
            />
            <StatusIndicator 
              status="warning" 
              message="Remember to validate your props" 
              showIcon={false}
            />
            <StatusIndicator 
              status="info" 
              message="Props enable component reusability" 
            />
          </div>
        </div>

        {/* Prop Drilling Example */}
        <div className="mb-6">
          <Card title="🔄 Prop Drilling Demonstration">
            <p className="text-gray-600 mb-3">
              Data flows down from parent to child components through props.
            </p>
            <div className="bg-gray-50 p-4 rounded font-mono text-sm">
              <div className="text-blue-600">App (data: "Hello Props!")</div>
              <div className="ml-4 text-green-600">└── Card (title: "Prop Drilling")</div>
              <div className="ml-8 text-purple-600">└── StatusIndicator (message: data)</div>
            </div>
          </Card>
        </div>

        {/* Key Concepts */}
        <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500 mb-6">
          <h3 className="text-lg font-semibold text-indigo-800 mb-3">
            🎓 Props Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-indigo-700">
              <li>• Basic prop passing</li>
              <li>• Props destructuring</li>
              <li>• Default props</li>
              <li>• Function props (callbacks)</li>
            </ul>
            <ul className="space-y-2 text-indigo-700">
              <li>• Children prop</li>
              <li>• Array and object props</li>
              <li>• Conditional props</li>
              <li>• Prop drilling concept</li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 4 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v5.0-state-basics
          </code>
        </div>
      </div>
    </div>
  )
}

export default App