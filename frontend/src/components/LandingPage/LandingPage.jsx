import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Users, 
  Building2, 
  DollarSign, 
  BarChart2, 
  Calendar, 
  Shield, 
  ChevronDown, 
  Menu, 
  X,
  CheckCircle
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Users className="w-12 h-12 text-teal-600" />,
      title: "Employee Management",
      description: "Easily manage employee profiles, track performance, and handle onboarding/offboarding processes."
    },
    {
      icon: <Building2 className="w-12 h-12 text-teal-600" />,
      title: "Department Organization",
      description: "Organize your workforce by departments, assign managers, and track departmental metrics."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-teal-600" />,
      title: "Payroll Processing",
      description: "Streamline your payroll operations with automated calculations and payment processing."
    },
    {
      icon: <Calendar className="w-12 h-12 text-teal-600" />,
      title: "Leave Management",
      description: "Efficiently handle leave requests, approvals, and track employee time off."
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-teal-600" />,
      title: "Performance Analytics",
      description: "Gain insights into employee performance with comprehensive analytics and reporting."
    },
    {
      icon: <Shield className="w-12 h-12 text-teal-600" />,
      title: "Secure Access Control",
      description: "Role-based access control ensures data security and proper information access."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "HR Director",
      company: "Tech Solutions Inc.",
      content: "This employee management system has transformed how we handle HR operations. The interface is intuitive and the features are comprehensive."
    },
    {
      name: "Michael Chen",
      position: "Operations Manager",
      company: "Global Enterprises",
      content: "The dashboard provides all the information I need at a glance. Managing departments and tracking leave has never been easier."
    },
    {
      name: "Jessica Williams",
      position: "CEO",
      company: "Startup Innovations",
      content: "As we scaled our team, this system kept everything organized. The payroll features alone saved us countless hours each month."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-teal-600 text-white shadow-lg fixed w-full z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold italic">Emp <span className="font-extrabold">Track</span></h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-teal-200 transition-colors">Features</a>
              <a href="#dashboard" className="hover:text-teal-200 transition-colors">Dashboard</a>
              <a href="#testimonials" className="hover:text-teal-200 transition-colors">Testimonials</a>
              <a href="#pricing" className="hover:text-teal-200 transition-colors">Pricing</a>
            </div>
            
            <div className="hidden md:block">
            <Link to="/Signin">
            <button className="cursor-pointer bg-white text-teal-600 px-4 py-2 rounded-md font-medium hover:bg-teal-50 transition-colors">
                Sign In
            </button>
            </Link>
            <Link to="/Signup">
            <button className="cursor-pointer ml-4 bg-teal-700 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-800 transition-colors">
                Sign Up
            </button>
            </Link>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-teal-700 py-4 px-4">
            <div className="flex flex-col space-y-3">
              <a href="#features" className="hover:text-teal-200 transition-colors">Features</a>
              <a href="#dashboard" className="hover:text-teal-200 transition-colors">Dashboard</a>
              <a href="#testimonials" className="hover:text-teal-200 transition-colors">Testimonials</a>
              <a href="#pricing" className="hover:text-teal-200 transition-colors">Pricing</a>
              <div className="pt-2 flex flex-col space-y-2">
                <button className="bg-white text-teal-600 px-4 py-2 rounded-md font-medium hover:bg-teal-50 transition-colors">
                  Sign In
                </button>
                <button className="bg-teal-800 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-900 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className={`md:w-1/2 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Simplify Your <br />
                <span className="text-teal-200">Employee Management</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-teal-50">
                A comprehensive solution to streamline HR operations, 
                boost productivity, and enhance employee experience.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-teal-50 transition-colors text-lg">
                  <a href='/Signup'>Get Started Free</a>
                </button>
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors text-lg">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className={`md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="bg-white p-2 rounded-lg shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Dashboard Preview" 
                  className="rounded-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-3xl md:text-4xl font-bold text-teal-600">5,000+</p>
              <p className="text-gray-600">Companies</p>
            </div>
            <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-3xl md:text-4xl font-bold text-teal-600">1M+</p>
              <p className="text-gray-600">Employees Managed</p>
            </div>
            <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-3xl md:text-4xl font-bold text-teal-600">98%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div className={`transition-all duration-700 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-3xl md:text-4xl font-bold text-teal-600">24/7</p>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your workforce efficiently in one integrated platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="h-96 relative">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 p-8 transition-all duration-500 ease-in-out flex flex-col justify-center ${
                      activeFeature === index 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-20 pointer-events-none'
                    }`}
                  >
                    <div className="mb-6">{feature.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-lg">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeFeature === index 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-white hover:bg-teal-50 text-gray-800'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-center">
                      <div className={`mr-4 ${activeFeature === index ? 'text-white' : 'text-teal-600'}`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                        <p className={activeFeature === index ? 'text-teal-100' : 'text-gray-600'}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Intuitive Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a complete overview of your organization with our powerful dashboard.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gray-800 rounded-t-xl p-3 w-full md:w-4/5 mx-auto">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white shadow-2xl rounded-b-xl overflow-hidden w-full md:w-4/5 mx-auto border border-gray-200">
              <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="bg-gray-900 text-white p-4 md:w-64">
                  <div className="py-4 px-2 border-b border-gray-700">
                    <h3 className="text-xl font-bold italic">Emp <span className="font-extrabold">Track</span></h3>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center p-2 bg-teal-600 rounded">
                      <BarChart2 className="mr-3 h-5 w-5" />
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors">
                      <Users className="mr-3 h-5 w-5" />
                      <span>Employees</span>
                    </div>
                    <div className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors">
                      <Building2 className="mr-3 h-5 w-5" />
                      <span>Departments</span>
                    </div>
                    <div className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors">
                      <Calendar className="mr-3 h-5 w-5" />
                      <span>Leave</span>
                    </div>
                    <div className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors">
                      <DollarSign className="mr-3 h-5 w-5" />
                      <span>Payroll</span>
                    </div>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                    <div className="flex items-center">
                      <span className="mr-2">Welcome Admin</span>
                      <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white">
                        A
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-teal-100">Total Employees</p>
                          <p className="text-3xl font-bold">149</p>
                        </div>
                        <Users className="h-12 w-12 opacity-80" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-amber-100">Departments</p>
                          <p className="text-3xl font-bold">8</p>
                        </div>
                        <Building2 className="h-12 w-12 opacity-80" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-rose-100">Monthly Payroll</p>
                          <p className="text-3xl font-bold">$125,400</p>
                        </div>
                        <DollarSign className="h-12 w-12 opacity-80" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">New employee onboarded</p>
                          <p className="text-sm text-gray-500">John Smith joined Engineering</p>
                        </div>
                        <div className="ml-auto text-sm text-gray-500">2 hours ago</div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Leave request approved</p>
                          <p className="text-sm text-gray-500">Sarah Johnson - 3 days vacation</p>
                        </div>
                        <div className="ml-auto text-sm text-gray-500">Yesterday</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by thousands of companies worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Starter</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-800">$29</span>
                  <span className="text-gray-600 ml-2">/ month</span>
                </div>
                <p className="text-gray-600 mb-6">Perfect for small businesses just getting started.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Up to 25 employees</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Basic reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Employee profiles</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Leave management</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <button className="w-full bg-teal-600 text-white py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                  <a href="/Signup">Get Started</a>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform hover:-translate-y-2 border-2 border-teal-600 relative">
              <div className="absolute top-0 right-0 bg-teal-600 text-white px-4 py-1 rounded-bl-lg font-medium">
                Popular
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Professional</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-800">$79</span>
                  <span className="text-gray-600 ml-2">/ month</span>
                </div>
                <p className="text-gray-600 mb-6">Ideal for growing businesses with more needs.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Up to 100 employees</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Advanced reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Payroll processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Performance reviews</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>API access</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <button className="w-full bg-teal-600 text-white py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                <a href="/Signup">Get Started</a>
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-800">$199</span>
                  <span className="text-gray-600 ml-2">/ month</span>
                </div>
                <p className="text-gray-600 mb-6">For large organizations with complex requirements.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Unlimited employees</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Custom reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Advanced security</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <button className="w-full bg-teal-600 text-white py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your HR operations?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Join thousands of companies that trust our platform to manage their workforce efficiently.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-teal-700 px-8 py-4 rounded-md font-medium hover:bg-teal-50 transition-colors text-lg">
              <a href="/Signup">Start Free Trial</a>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-medium hover:bg-white/10 transition-colors text-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold italic mb-4">Emp <span className="font-extrabold">Track</span></h3>
              <p className="text-gray-400">
                Simplifying employee management for businesses of all sizes since 2020.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 Emp Track. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;