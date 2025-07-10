import React, { useState } from 'react'

// Basic controlled form
function BasicForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Form submitted! Check console for data.')
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      message: ''
    })
  }

  return (
    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        📝 Basic Controlled Form
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-blue-700 font-medium mb-1">Name:</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-blue-700 font-medium mb-1">Email:</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-blue-700 font-medium mb-1">Age:</label>
          <input 
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="1"
            max="120"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-blue-700 font-medium mb-1">Message:</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="3"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
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
        
        <div className="p-3 bg-blue-100 rounded">
          <h4 className="font-semibold text-blue-800 mb-2">Form Data:</h4>
          <pre className="text-sm text-blue-700 whitespace-pre-wrap">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// Form with validation
function ValidatedForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value) return 'Username is required'
        if (value.length < 3) return 'Username must be at least 3 characters'
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores'
        return ''
        
      case 'email':
        if (!value) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
        return ''
        
      case 'password':
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and number'
        return ''
        
      case 'confirmPassword':
        if (!value) return 'Please confirm your password'
        if (value !== formData.password) return 'Passwords do not match'
        return ''
        
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
    
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    
    setErrors(newErrors)
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!')
      console.log('Valid form data:', formData)
    }
  }

  return (
    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        ✅ Form with Validation
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-green-700 font-medium mb-1">Username:</label>
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter username"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        
        <div>
          <label className="block text-green-700 font-medium mb-1">Email:</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter email"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-green-700 font-medium mb-1">Password:</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter password"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label className="block text-green-700 font-medium mb-1">Confirm Password:</label>
          <input 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm password"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        
        <button 
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
          Create Account
        </button>
        
        <div className="p-3 bg-green-100 rounded">
          <h4 className="font-semibold text-green-800 mb-2">Validation Status:</h4>
          <div className="space-y-1">
            {Object.keys(formData).map(key => (
              <div key={key} className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${
                  touched[key] && !errors[key] ? 'bg-green-500' : 
                  errors[key] ? 'bg-red-500' : 'bg-gray-300'
                }`}></span>
                <span className="text-sm text-green-700 capitalize">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Complex form with multiple input types
function ComplexForm() {
  const [formData, setFormData] = useState({
    // Text inputs
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Select inputs
    country: '',
    state: '',
    
    // Checkbox and radio
    newsletter: false,
    notifications: [],
    gender: '',
    
    // Date and file
    birthDate: '',
    profilePicture: null,
    
    // Textarea
    bio: ''
  })

  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France']
  const states = ['California', 'New York', 'Texas', 'Florida', 'Illinois']
  const notificationTypes = ['Email', 'SMS', 'Push', 'In-app']

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      if (name === 'newsletter') {
        setFormData(prev => ({ ...prev, [name]: checked }))
      } else if (name === 'notifications') {
        setFormData(prev => ({
          ...prev,
          notifications: checked 
            ? [...prev.notifications, value]
            : prev.notifications.filter(item => item !== value)
        }))
      }
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: e.target.files[0] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Complex form submitted:', formData)
    alert('Form submitted! Check console for data.')
  }

  return (
    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        🔧 Complex Form with Multiple Input Types
      </h3>
      
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h4 className="font-semibold text-purple-700 mb-3">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-700 font-medium mb-1">First Name:</label>
              <input 
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-1">Last Name:</label>
              <input 
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="font-semibold text-purple-700 mb-3">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-700 font-medium mb-1">Email:</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-1">Phone:</label>
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-semibold text-purple-700 mb-3">Location</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-700 font-medium mb-1">Country:</label>
              <select 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-1">State:</label>
              <select 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h4 className="font-semibold text-purple-700 mb-3">Preferences</h4>
          
          {/* Newsletter checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="w-4 h-4 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-purple-700">Subscribe to newsletter</span>
            </label>
          </div>

          {/* Notification preferences */}
          <div className="mb-4">
            <label className="block text-purple-700 font-medium mb-2">Notification Preferences:</label>
            <div className="space-y-2">
              {notificationTypes.map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    name="notifications"
                    value={type}
                    checked={formData.notifications.includes(type)}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-purple-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender radio buttons */}
          <div className="mb-4">
            <label className="block text-purple-700 font-medium mb-2">Gender:</label>
            <div className="flex space-x-4">
              {['Male', 'Female', 'Other', 'Prefer not to say'].map(gender => (
                <label key={gender} className="flex items-center space-x-2">
                  <input 
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-purple-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h4 className="font-semibold text-purple-700 mb-3">Additional Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-purple-700 font-medium mb-1">Birth Date:</label>
              <input 
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-purple-700 font-medium mb-1">Profile Picture:</label>
              <input 
                type="file"
                name="profilePicture"
                onChange={handleInputChange}
                accept="image/*"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-purple-700 font-medium mb-1">Bio:</label>
            <textarea 
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded font-semibold"
        >
          Submit Profile
        </button>
        
        <div className="p-3 bg-purple-100 rounded">
          <h4 className="font-semibold text-purple-800 mb-2">Form Data Preview:</h4>
          <pre className="text-sm text-purple-700 whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// Dynamic form with add/remove fields
function DynamicForm() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    skills: [{ id: 1, name: '', level: 'beginner' }],
    experiences: [{ id: 1, company: '', position: '', duration: '' }]
  })

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      level: 'beginner'
    }
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const removeSkill = (id) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const updateSkill = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      duration: ''
    }
    setProfile(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }))
  }

  const removeExperience = (id) => {
    setProfile(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }))
  }

  const updateExperience = (id, field, value) => {
    setProfile(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const handleBasicChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dynamic form submitted:', profile)
    alert('Profile submitted! Check console for data.')
  }

  return (
    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        🔄 Dynamic Form (Add/Remove Fields)
      </h3>
      
      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <h4 className="font-semibold text-yellow-700 mb-3">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-700 font-medium mb-1">Name:</label>
              <input 
                type="text"
                name="name"
                value={profile.name}
                onChange={handleBasicChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-yellow-700 font-medium mb-1">Email:</label>
              <input 
                type="email"
                name="email"
                value={profile.email}
                onChange={handleBasicChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-yellow-700">Skills</h4>
            <button 
              onClick={addSkill}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold"
            >
              Add Skill
            </button>
          </div>
          
          <div className="space-y-3">
            {profile.skills.map(skill => (
              <div key={skill.id} className="flex items-center space-x-2">
                <input 
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  placeholder="Skill name"
                  className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <select 
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <button 
                  onClick={() => removeSkill(skill.id)}
                  disabled={profile.skills.length === 1}
                  className={`px-2 py-2 rounded text-sm ${
                    profile.skills.length === 1 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-yellow-700">Experience</h4>
            <button 
              onClick={addExperience}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold"
            >
              Add Experience
            </button>
          </div>
          
          <div className="space-y-3">
            {profile.experiences.map(exp => (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <input 
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Company"
                  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input 
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Position"
                  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input 
                  type="text"
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                  placeholder="Duration"
                  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button 
                  onClick={() => removeExperience(exp.id)}
                  disabled={profile.experiences.length === 1}
                  className={`px-2 py-2 rounded text-sm ${
                    profile.experiences.length === 1 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold"
        >
          Submit Profile
        </button>
        
        <div className="p-3 bg-yellow-100 rounded">
          <h4 className="font-semibold text-yellow-800 mb-2">Profile Data:</h4>
          <pre className="text-sm text-yellow-700 whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

// Main App component
function App() {
  const [activeDemo, setActiveDemo] = useState('basic')

  const demos = {
    basic: { component: <BasicForm />, name: 'Basic Form' },
    validation: { component: <ValidatedForm />, name: 'Form Validation' },
    complex: { component: <ComplexForm />, name: 'Complex Form' },
    dynamic: { component: <DynamicForm />, name: 'Dynamic Form' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step 9: Forms
          </h1>
          <p className="text-lg text-gray-600">
            Mastering form handling and validation
          </p>
        </div>

        {/* Demo Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📝 Form Demos
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeDemo === key
                    ? 'bg-violet-500 text-white'
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
        <div className="bg-violet-50 p-6 rounded-lg border-l-4 border-violet-500 mb-6">
          <h3 className="text-lg font-semibold text-violet-800 mb-3">
            🎓 Form Concepts Mastered:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-violet-700">
              <li>• Controlled components</li>
              <li>• Form state management</li>
              <li>• Input validation</li>
              <li>• Error handling</li>
            </ul>
            <ul className="space-y-2 text-violet-700">
              <li>• Multiple input types</li>
              <li>• Dynamic form fields</li>
              <li>• Form submission</li>
              <li>• Real-time validation</li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            💡 Form Best Practices:
          </h3>
          <ul className="space-y-2 text-amber-700">
            <li>• Use controlled components for predictable behavior</li>
            <li>• Validate on blur and submit, not on every keystroke</li>
            <li>• Provide clear error messages</li>
            <li>• Use proper input types (email, tel, date, etc.)</li>
            <li>• Handle form submission with preventDefault()</li>
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
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Progress: Step 9 of 12</p>
          <code className="bg-gray-200 px-3 py-1 rounded text-sm">
            git checkout v10.0-useeffect
          </code>
        </div>
      </div>
    </div>
  )
}

export default App