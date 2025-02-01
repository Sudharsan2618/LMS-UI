import React from "react";
import { GraduationCap, MessageCircle, Award, Brain, BookOpen, Briefcase } from "lucide-react"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary">TATTI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We are redefining the way people learn and grow in their careers. Our mission is to create a seamless,
            engaging, and cutting-edge platform that combines education, technology, and innovation.
          </p>


          <Link to={"/courses"}
            className="px-8 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Vision</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-600 text-center">
              We envision a world where learning is interactive, intuitive, and inclusive. By integrating AI
              intelligence, virtual internships, and gamified education, we aim to empower individuals to unlock their
              potential.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <img
                  src="/placeholder.svg"
                  alt={`Partner ${i}`}
                  width={200}
                  height={100}
                  className="grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Interactive Assessments"
              description="Measure your skills and track your progress in real-time."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Online Certifications"
              description="Earn recognized certifications upon completing courses and internships."
            />
            <FeatureCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Gamified Learning"
              description="Learn skills through the lens of your favorite games like cricket and football."
            />
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8" />}
              title="AI-Driven Interactions"
              description="Chat with books, upload notes, and ask questions with advanced AI capabilities."
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Premium Courses"
              description="Access lifetime premium content for in-demand skills and career growth."
            />
            <FeatureCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Virtual Internships"
              description="Experience real-world challenges and gain certificates for successful completions."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              We're here to help! If you have any questions, feedback, or want to know more about our platform, don't
              hesitate to reach out.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">Email: contact@tatti.edu</p>
              <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
              <p className="text-gray-600">Address: 123 Learning Street, Education City, 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About TATTI</h3>
              <p className="text-gray-400">Redefining education through technology and innovation.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Certifications
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Virtual Internships
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with our latest offerings</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} TATTI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default Home;
