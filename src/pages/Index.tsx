import { useState, useEffect } from 'react';
import { Truck, Package, MapPin, ChevronRight, Star, Shield, Clock, Globe, Apple, Smartphone, UserPlus, RadioTower, Bell, CreditCard, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/WaitlistForm";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold gradient-text drop-shadow-md">
              Mizigo Africa
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              <a href="#services" className={`${isScrolled ? 'text-mizigo-dark' : 'text-white'} hover:text-mizigo-primary transition-colors font-medium drop-shadow-md text-sm lg:text-base`}>Services</a>
              <a href="#how-it-works" className={`${isScrolled ? 'text-mizigo-dark' : 'text-white'} hover:text-mizigo-primary transition-colors font-medium drop-shadow-md text-sm lg:text-base`}>How it Works</a>
              <a href="#drivers" className={`${isScrolled ? 'text-mizigo-dark' : 'text-white'} hover:text-mizigo-primary transition-colors font-medium drop-shadow-md text-sm lg:text-base`}>For Drivers</a>
              <a href="/contact" className={`${isScrolled ? 'text-mizigo-dark' : 'text-white'} hover:text-mizigo-primary transition-colors font-medium drop-shadow-md text-sm lg:text-base`}>Contact</a>
              <WaitlistForm />
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${isScrolled ? 'text-mizigo-dark' : 'text-white'} transition-colors p-2`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
              <div className="flex flex-col gap-4">
                <a 
                  href="#services" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${isScrolled ? 'text-mizigo-dark' : 'text-white'} hover:text-mizigo-primary transition-colors font-medium py-2`}
                >
                  Services
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${isScrolled ? 'text-mizigo-dark' : 'text-white'} hover:text-mizigo-primary transition-colors font-medium py-2`}
                >
                  How it Works
                </a>
                <a 
                  href="#drivers" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${isScrolled ? 'text-mizigo-dark' : 'text-white'} hover:text-mizigo-primary transition-colors font-medium py-2`}
                >
                  For Drivers
                </a>
                <a 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${isScrolled ? 'text-mizigo-dark' : 'text-white'} hover:text-mizigo-primary transition-colors font-medium py-2`}
                >
                  Contact
                </a>
                <div className="pt-2">
                  <WaitlistForm />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate"
          className="absolute w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
          preload="auto"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="container relative z-10 px-4 sm:px-6 text-center">
          <div className="inline-block mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full">
            <span className="text-white font-medium text-xs sm:text-sm">Africa's Leading Logistics Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-up px-2">
            Connecting cargo owners with <br className="hidden sm:block" />
            <span className="text-mizigo-primary">verified transporters</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 animate-fade-up max-w-2xl mx-auto font-medium px-4" style={{ animationDelay: '0.2s' }}>
          Join our waitlist now and be the first to experience seamless logistics solutions across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-up px-4" style={{ animationDelay: '0.4s' }}>
            <img src="/app-store.png" alt="App Store" className="h-12 sm:h-14 md:h-16 w-auto max-w-[150px] sm:max-w-none" />
            <img src="/google-play-store.png" alt="Play Store" className="h-12 sm:h-14 md:h-16 w-auto max-w-[150px] sm:max-w-none"/>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="text-mizigo-dark font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 tracking-wider">OUR SERVICES</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-mizigo-dark px-2">
              Next-Generation Logistics Solutions
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg px-4">
              Experience the future of cargo transportation with our innovative features and technology-driven solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-lg card-hover">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-mizigo-dark rounded-md flex items-center justify-center floating">
                  <RadioTower className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-mizigo-primary" />
                </div>
                <div className="absolute top-0 right-0">
                  <Star className="text-mizigo-primary w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-mizigo-dark">Real-Time Tracking</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Track your cargo in real-time with live GPS updates and estimated arrival times.</p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-mizigo-dark" />
                  Live GPS Updates
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mizigo-dark" />
                  ETA Predictions
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-mizigo-dark" />
                  Route Visualization
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-lg card-hover">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-mizigo-dark rounded-md flex items-center justify-center floating">
                  <Bell className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-mizigo-primary" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-mizigo-dark">Smart Notifications</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Stay informed with intelligent notifications about your cargo's journey.</p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-mizigo-dark" />
                  Pickup Confirmations
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mizigo-dark" />
                  Delivery Updates
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-mizigo-dark" />
                  Delay Alerts
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-lg card-hover">
              <div className="mb-4 sm:mb-6 relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-mizigo-dark rounded-md flex items-center justify-center floating">
                  <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-mizigo-primary" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-mizigo-dark">Secure Payments</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Integrated payment solutions with escrow protection for peace of mind.</p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-mizigo-dark" />
                  Escrow Protection
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mizigo-dark" />
                  Multiple Payment Options
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-mizigo-dark" />
                  Digital Receipts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="text-mizigo-dark font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 tracking-wider">HOW IT WORKS</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-mizigo-dark px-2">
              Simple Steps to Get Started
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg px-4">
              Experience hassle-free logistics in just a few simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-mizigo-dark/20 -z-10"></div>
            <div className="text-center relative">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 bg-mizigo-dark/10 rounded-full flex items-center justify-center card-hover">
              <img src="/order.png" alt="Order" className="w-10 h-10 sm:w-12 sm:h-12 md:w-auto md:h-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-mizigo-dark">Create Order</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">Describe your cargo and pickup location for instant quotes from our network.</p>
            </div>
            <div className="text-center relative">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 bg-mizigo-dark/10 rounded-full flex items-center justify-center card-hover">
                <img src="/driver.png" alt="Driver" className="w-10 h-10 sm:w-12 sm:h-12 md:w-auto md:h-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-mizigo-dark">Choose Driver</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">Select from our verified drivers based on ratings and availability.</p>
            </div>
            <div className="text-center relative">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 bg-mizigo-dark/10 rounded-full flex items-center justify-center card-hover">
              <img src="/truck.png" alt="Truck" className="w-10 h-10 sm:w-12 sm:h-12 md:w-auto md:h-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-mizigo-dark">Track Real-time</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">Monitor your cargo's journey with real-time tracking and updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section id="drivers" className="py-12 sm:py-16 md:py-20 bg-mizigo-dark text-white">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="text-white font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 tracking-wider">FOR DRIVERS</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white px-2">
              Join Our Network of Professional Drivers
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg px-4">
              Partner with Mizigo Africa and grow your business while maintaining flexibility and earning potential.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-4 sm:p-6 rounded-md bg-white/5 backdrop-blur-md border border-white/10 card-hover">
              <UserPlus className="w-10 h-10 sm:w-12 sm:h-12 text-mizigo-primary mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Easy Registration</h3>
              <p className="text-white/75 mb-3 sm:mb-4 text-sm sm:text-base">Simple onboarding process with quick approval for qualified drivers.</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-mizigo-primary" />
                  Vehicle documentation
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mizigo-primary" />
                  Background check
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-mizigo-primary" />
                  Driver verification
                </li>
              </ul>
            </div>
            <div className="p-4 sm:p-6 rounded-md bg-white/5 backdrop-blur-md border border-white/10 card-hover">
              <Star className="w-10 h-10 sm:w-12 sm:h-12 text-mizigo-primary mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Build Your Reputation</h3>
              <p className="text-white/75 mb-3 sm:mb-4 text-sm sm:text-base">Earn higher ratings and build trust with customers through quality service.</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-mizigo-primary" />
                  Customer ratings
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mizigo-primary" />
                  On-time delivery tracking
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-mizigo-primary" />
                  Service quality metrics
                </li>
              </ul>
            </div>
            <div className="p-4 sm:p-6 rounded-md bg-white/5 backdrop-blur-md border border-white/10 card-hover">
              <Truck className="w-10 h-10 sm:w-12 sm:h-12 text-mizigo-primary mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Grow Your Business</h3>
              <p className="text-white/75 mb-3 sm:mb-4 text-sm sm:text-base">Access more customers and increase your earnings through our platform.</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-mizigo-primary" />
                  Wide customer base
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-mizigo-primary" />
                  Flexible schedule
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-mizigo-primary" />
                  Secure payments
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <a href="/driver-registration">
              <Button 
                size="lg"
                className="bg-white hover:bg-mizigo-primary text-mizigo-dark hover:text-white font-bold px-6 sm:px-8 shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                Register as a Driver <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-mizigo-primary to-mizigo-secondary">
        <div className="container px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-black px-2">
            Ready to Move with Mizigo Africa?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-black/90 max-w-2xl mx-auto font-medium px-4">
            Join our waitlist now and be the first to experience seamless logistics solutions across Africa.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mizigo-dark text-white py-8 sm:py-12">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 gradient-text">Mizigo Africa</h3>
              <p className="opacity-75 text-sm sm:text-base">Connecting Africa through seamless logistics solutions.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-white/50 hover:text-mizigo-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/50 hover:text-mizigo-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/50 hover:text-mizigo-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 opacity-75">
                <li>Freight Forwarding</li>
                <li>Customs Brokerage</li>
                <li>Warehousing</li>
                <li>Last Mile Delivery</li>
                <li>Express Shipping</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 opacity-75">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 opacity-75">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Shipping Policy</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="opacity-75 text-sm sm:text-base">&copy; 2025 Mizigo Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
