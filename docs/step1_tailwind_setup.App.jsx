import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            React Learning Journey
          </h1>
          <p className="text-lg text-gray-600">
            Built with Vite ⚡ + Tailwind CSS 🎨
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Step 1: Project Setup Complete! ✅
          </h2>
          <p className="text-green-700">
            If you can see this styled page, Vite and Tailwind are working perfectly!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              🚀 Vite Features
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li>• Lightning fast HMR</li>
              <li>• Modern build tooling</li>
              <li>• ES modules support</li>
              <li>• Optimized development</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              🎨 Tailwind CSS
            </h3>
            <ul className="space-y-2 text-purple-700">
              <li>• Utility-first CSS</li>
              <li>• Responsive design</li>
              <li>• Custom components</li>
              <li>• Easy customization</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Next Steps:</h3>
          <div className="flex flex-wrap gap-2">
            <code className="bg-gray-200 px-3 py-1 rounded text-sm">
              git checkout v2.0-jsx-basics
            </code>
            <span className="text-gray-600">→ Learn JSX fundamentals</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
          </div>
          <p className="text-sm text-gray-500">
            Development server running with hot reload
          </p>
        </div>
      </div>
    </div>
  )
}

export default App