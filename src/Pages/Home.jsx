// import React from "react";
// import { GraduationCap, MessageCircle, Award, Brain, BookOpen, Briefcase } from "lucide-react"
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-b from-yellow-50 to-white py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//             Welcome to <span className="text-primary">TATTI</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//             We are redefining the way people learn and grow in their careers. Our mission is to create a seamless,
//             engaging, and cutting-edge platform that combines education, technology, and innovation.
//           </p>


//           <Link to={"/courses"}
//             className="px-8 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
//           >
//             Get Started
//           </Link>
//         </div>
//       </section>

//       {/* Vision Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">Our Vision</h2>
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <p className="text-lg text-gray-600 text-center">
//               We envision a world where learning is interactive, intuitive, and inclusive. By integrating AI
//               intelligence, virtual internships, and gamified education, we aim to empower individuals to unlock their
//               potential.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Partners Section */}
//       <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="flex items-center justify-center">
//                 <img
//                   src="/placeholder.svg"
//                   alt={`Partner ${i}`}
//                   width={200}
//                   height={100}
//                   className="grayscale hover:grayscale-0 transition-all"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">Features We Offer</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <FeatureCard
//               icon={<Brain className="w-8 h-8" />}
//               title="Interactive Assessments"
//               description="Measure your skills and track your progress in real-time."
//             />
//             <FeatureCard
//               icon={<Award className="w-8 h-8" />}
//               title="Online Certifications"
//               description="Earn recognized certifications upon completing courses and internships."
//             />
//             <FeatureCard
//               icon={<GraduationCap className="w-8 h-8" />}
//               title="Gamified Learning"
//               description="Learn skills through the lens of your favorite games like cricket and football."
//             />
//             <FeatureCard
//               icon={<MessageCircle className="w-8 h-8" />}
//               title="AI-Driven Interactions"
//               description="Chat with books, upload notes, and ask questions with advanced AI capabilities."
//             />
//             <FeatureCard
//               icon={<BookOpen className="w-8 h-8" />}
//               title="Premium Courses"
//               description="Access lifetime premium content for in-demand skills and career growth."
//             />
//             <FeatureCard
//               icon={<Briefcase className="w-8 h-8" />}
//               title="Virtual Internships"
//               description="Experience real-world challenges and gain certificates for successful completions."
//             />
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
//           <div className="max-w-2xl mx-auto text-center">
//             <p className="text-lg text-gray-600 mb-8">
//               We're here to help! If you have any questions, feedback, or want to know more about our platform, don't
//               hesitate to reach out.
//             </p>
//             <div className="space-y-4">
//               <p className="text-gray-600">Email: contact@tatti.edu</p>
//               <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
//               <p className="text-gray-600">Address: 123 Learning Street, Education City, 12345</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">About TATTI</h3>
//               <p className="text-gray-400">Redefining education through technology and innovation.</p>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link to="#" className="text-gray-400 hover:text-white transition-colors">
//                     Courses
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="text-gray-400 hover:text-white transition-colors">
//                     Certifications
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" className="text-gray-400 hover:text-white transition-colors">
//                     Virtual Internships
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Follow Us</h3>
//               <div className="flex space-x-4">
//                 <Link to="#" className="text-gray-400 hover:text-white transition-colors">
//                   Twitter
//                 </Link>
//                 <Link to="#" className="text-gray-400 hover:text-white transition-colors">
//                   LinkedIn
//                 </Link>
//                 <Link to="#" className="text-gray-400 hover:text-white transition-colors">
//                   Facebook
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Newsletter</h3>
//               <p className="text-gray-400 mb-4">Stay updated with our latest offerings</p>
//               <div className="flex gap-2">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="px-4 py-2 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//             <p className="text-gray-400">&copy; {new Date().getFullYear()} TATTI. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
//       <div className="flex flex-col items-center text-center">
//         <div className="mb-4 text-primary">{icon}</div>
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </div>
//   )
// }

// export default Home;



import React from "react";
import heroImg from "../assets/images/hero.png"
import { Link } from "react-router-dom";
import wave from "../assets/images/wave.png"
import partner1 from "../assets/images/partner1.png"
import partner2 from "../assets/images/partner2.png"
import partner3 from "../assets/images/partner3.png"
import partner4 from "../assets/images/partner4.png"

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-t from-yellow-100 to-yellow-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Welcome To TATTI</h1>
              <p className="text-gray-700 max-w-lg">
                We are redefining the way people learn and grow in their careers. Our mission is to create a seamless,
                engaging, and cutting-edge platform that combines education, technology, and innovation.
              </p>
              <Link to={"/courses"}
              >
                <button
                  className=" text-white bg-primary  hover:bg-primary-dark  px-8 py-3 mt-4 rounded-md text-lg font-medium transition-transform"
                >
                  Get Started
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <img
                src={heroImg}
                alt="Students learning together"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      <img className="h-[30vh] w-full object-fill" src={wave} alt="" />
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="/icons/assessment.svg"
              title="Interactive Assessments"
              description="Measure your skills and track your progress in real-time."
            />
            <FeatureCard
              icon="/icons/certification.svg"
              title="Online Certifications"
              description="Earn recognized certifications upon completing courses and internships."
            />
            <FeatureCard
              icon="/icons/gamified.svg"
              title="Employability Skills"
              description="Equipping individuals with the essential skills to thrive in the modern job market."
            />
            <FeatureCard
              icon="/icons/ai.svg"
              title="AI-Driven Interactions"
              description="Chat with books, upload notes, and ask questions with advanced AI capabilities."
            />
            <FeatureCard
              icon="/icons/premium.svg"
              title="Entrepreneurship Skills"
              description="Empowering aspiring entrepreneurs with the tools and mindset to launch and grow successful ventures."
            />
            <FeatureCard
              icon="/icons/internship.svg"
              title="Virtual Internships"
              description="Experience real-world challenges and gain certificates for successful completions."
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Vision</h2>
          {/* <div className=" text-center m-auto my-4 max-w-5xl">

            <p className=" font-semibold">Empowering Futures Through Connection, Innovation, and Education</p>
            <p>Rooted in a legacy of innovation, entrepreneurship, and community building, our Learning Management System (LMS) is a manifestation of the drive to create impactful solutions that shape brighter futures. With a deep understanding of technology and a proven track record of fostering growth, we aim to bridge the gap between students and colleges, creating a seamless platform that connects aspirations with opportunities.</p>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VisionCard
              icon="/icons/interactive.svg"
              title="Interactive Learning"
              description="Our platform's digital experience is engaging and immersive."
            />
            <VisionCard
              icon="/icons/intuitive.svg"
              title="Intuitive Experience"
              description="Learning should be seamless, adaptive, and easy to grasp."
            />
            <VisionCard
              icon="/icons/inclusive.svg"
              title="Inclusive Education"
              description="Learners, regardless of background, should have access to quality education."
            />
            <VisionCard
              icon="/icons/virtual.svg"
              title="Virtual Internships"
              description="Providing real-world exposure and hands-on experience."
            />
            <VisionCard
              icon="/icons/ai-integration.svg"
              title="AI Integration"
              description="Leveraging artificial intelligence to enhance the learning experience."
            />
            <VisionCard
              icon="/icons/gamified-edu.svg"
              title="Gamified Education"
              description="Making learning fun, interactive, and motivating."
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-13 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img src={partner1} alt="" className="size-44 object-contain" />
            <img src={partner2} alt="" className="size-44 object-contain" />
            <img src={partner3} alt="" className="size-44 object-contain" />
            <img src={partner4} alt="" className="size-44 object-contain" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-16 md:py-24 bg-sky-200">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-gray-700">
                We're here to help! If you have any questions, feedback, or want to know more about our platform,
                don't hesitate to reach out.
              </p>
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> contact@tatti.edu</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Learning Street, Education City, 12345</p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/contact-illustration.svg"
                alt="Contact support"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About TATTI</h3>
              <p className="text-gray-400 text-sm">Redefining education through technology and innovation.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Certifications</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Virtual Internships</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://x.com/TattiSkills" className="text-gray-400 hover:text-white text-sm">Twitter</a>
                <a href="https://www.linkedin.com/company/tamilnadu-advanced-technical-training-institute/" className="text-gray-400 hover:text-white text-sm">LinkedIn</a>
                <a href="https://www.facebook.com/TattiChennai" className="text-gray-400 hover:text-white text-sm">Facebook</a>
              </div>
              <div className="container mx-auto">
                <div className="space-y-4 mt-4">
                  {/* <p className="text-gray-400">
                    We're here to help! If you have any questions, feedback, or want to know more about our platform,
                    don't hesitate to reach out.
                  </p> */}
                  <div className="space-y-2">
                    <p className="text-gray-400"><strong>Email:</strong> admin@tatti.in</p>
                    <p className="text-gray-400"><strong>Phone:</strong> 9884170589</p>
                    <p className="text-gray-400"><strong>Address:</strong> no 42/25, Gee Gee Complex, Anna Salai, Mount Road, Anna Salai, Triplicane, Chennai, Tamil Nadu 600002
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">Stay updated with our latest offerings</p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white p-2 rounded"
                />
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 TATTI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
    <div className="bg-orange-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
      <img src={icon} alt={title} className="w-8 h-8" />
    </div>
    <h3 className="font-bold text-lg mt-4 mb-2">{title}</h3>
    <p className="text-gray-700 text-sm">{description}</p>
  </div>
);

// Reusable Vision Card Component
const VisionCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
    <div className="flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-lg">
        <img src={icon} alt={title} className="w-8 h-8" />
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

export default Home;