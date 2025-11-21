import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending contact message:', error);
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation (same as Index for consistency) */}
      <nav className="fixed w-full z-50 bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold gradient-text">
              Mizigo Africa
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/#services" className="text-mizigo-dark hover:text-mizigo-primary transition-colors">Services</a>
              <a href="/#how-it-works" className="text-mizigo-dark hover:text-mizigo-primary transition-colors">How it Works</a>
              <a href="/#drivers" className="text-mizigo-dark hover:text-mizigo-primary transition-colors">For Drivers</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Content */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-mizigo-dark mb-4">Contact Us</h1>
            <p className="text-gray-600">Get in touch with our team for any inquiries or support.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-xl font-semibold mb-6">Get in Touch</div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-mizigo-primary mt-1" />
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:info@mizigoafrica.com" className="text-gray-600 hover:text-mizigo-primary">
                    info@mizigoafrica.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-mizigo-primary mt-1" />
                <div>
                  <div className="font-semibold">Phone</div>
                  
                  <a href="tel:+254 703 161180" className="text-gray-600 hover:text-mizigo-primary">
                  +254 703 161180
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-mizigo-primary mt-1" />
                <div>
                  <div className="font-semibold">Address</div>
                  <p className="text-gray-600">
                    Mizigo Africa Headquarters<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mizigo-primary focus:border-mizigo-primary"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mizigo-primary focus:border-mizigo-primary"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-mizigo-primary focus:border-mizigo-primary"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-mizigo-primary text-white py-2 px-4 rounded-md hover:bg-mizigo-secondary transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;