import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  BarChart3,
  Zap,
  Star,
  Play,
  TrendingUp,
  Clock,
  Shield,
  Sparkles,
  Globe,
  Award,
  ChevronDown,
  LogIn,
} from "lucide-react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Project Tracking",
      description:
        "Monitor project progress with real-time updates, deadline tracking, and milestone management.",
      color: "blue",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Seamlessly manage team members, assign roles, and foster collaborative workflows.",
      color: "green",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Gain insights with productivity metrics, completion rates, and performance analytics.",
      color: "purple",
    },
    {
      icon: Zap,
      title: "Task Management",
      description:
        "Organize tasks by categories, set priorities, and track completion status efficiently.",
      color: "orange",
    },
  ];

  const stats = [
    { number: "10K+", label: "Projects Managed", icon: Target },
    { number: "50K+", label: "Tasks Completed", icon: CheckCircle },
    { number: "5K+", label: "Teams Organized", icon: Users },
    { number: "98%", label: "User Satisfaction", icon: Star },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow Inc.",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "This project manager has transformed how our team collaborates. The dark interface is beautiful and the features are incredibly intuitive.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Team Lead",
      company: "InnovateLab",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      text: "The analytics dashboard gives us insights we never had before. Project completion rates have improved by 40% since we started using it.",
    },
    {
      name: "Emily Watson",
      role: "Startup Founder",
      company: "NextGen Solutions",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "Perfect for managing multiple projects simultaneously. The task categorization and team management features are game-changers.",
    },
  ];

  const benefits = [
    {
      title: "Boost Productivity",
      description:
        "Increase team efficiency by up to 40% with streamlined workflows and automated task tracking.",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Save Time",
      description:
        "Reduce project management overhead by 60% with intelligent automation and smart notifications.",
      icon: Clock,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime ensures your data is always safe and accessible.",
      icon: Shield,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen pt-5 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation Header */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1550439062-609e1531270e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHx3b3Jrc3BhY2UlMjBtb25pdG9ycyUyMHRlY2hub2xvZ3klMjBkYXJrfGVufDB8MHx8YmxhY2t8MTc1NTExMzg2OXww&ixlib=rb-4.1.0&q=85"
            alt="Modern tech workspace with multiple monitors, dark ambient lighting, futuristic setup - Max Duzij on Unsplash"
            className="w-full h-full object-cover opacity-10"
            style={{ width: "100%", height: "100%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-8">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-smmd font-medium text-blue-300">
                Next-Gen Project Management
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Manage Projects
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your team's productivity with our cutting-edge project management platform.
              Track progress, collaborate seamlessly, and achieve your goals faster than ever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/auth/signup"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover-lift flex items-center gap-3"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="group flex items-center gap-3 px-8 py-4 glass rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="h-5 w-5 ml-1" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 gradient-card rounded-2xl flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                {" "}
                Modern Teams
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to manage projects efficiently, collaborate effectively, and
              deliver results that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-500 hover-lift cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    activeFeature === index
                      ? feature.color === "blue"
                        ? "gradient-blue"
                        : feature.color === "green"
                          ? "gradient-green"
                          : feature.color === "purple"
                            ? "bg-gradient-to-br from-purple-500 to-pink-500"
                            : "bg-gradient-to-br from-orange-500 to-red-500"
                      : "gradient-card"
                  }`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="glass rounded-3xl p-8 hover-lift transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1486927181919-3ac1fc3a8082?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxjaGFydHMlMjBncmFwaHMlMjBhbmFseXRpY3MlMjBidXNpbmVzc3xlbnwwfDB8fGJsdWV8MTc1NTExMzg2OXww&ixlib=rb-4.1.0&q=85"
                  alt="Abstract project management visualization, charts, graphs, productivity - Luca Bravo on Unsplash"
                  className="w-full h-80 object-cover rounded-2xl"
                  style={{ width: "100%", height: "320px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 gradient-blue rounded-2xl flex items-center justify-center animate-pulse">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why Choose Our
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {" "}
                    Platform?
                  </span>
                </h2>
                <p className="text-xl text-gray-400">
                  Experience the difference with features designed for modern teams who demand
                  excellence.
                </p>
              </div>

              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-6 group">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by Teams
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of teams who have transformed their productivity with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 hover-lift"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 leading-relaxed mb-6 italic">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-12 h-12 rounded-full"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-blue-400">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ProjectManager</span>
            </div>

            <div className="flex items-center gap-6 text-gray-400">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Available Worldwide
              </span>
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Trusted by 10K+ Teams
              </span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 ProjectManager. Built with passion for modern teams.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
