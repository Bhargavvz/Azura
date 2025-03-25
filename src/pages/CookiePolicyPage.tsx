import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Shield, Eye, Settings, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pt-24 pb-16">
      {/* Back Button */}
      <Link to="/" className="absolute top-8 left-8 text-indigo-300 hover:text-white transition-colors">
        <motion.div
          whileHover={{ x: -5 }}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.div>
      </Link>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20"
        >
          {/* Header */}
          <div className="p-8 bg-gradient-to-r from-indigo-900 to-slate-900 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-8 h-8 text-indigo-400" />
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Cookie Policy
              </h1>
            </div>
            <p className="text-indigo-200">Last updated: March 24, 2025</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8 text-indigo-100">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                  <p className="mb-2">These cookies are necessary for the website to function properly:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Session management</li>
                    <li>Form submission handling</li>
                    <li>Security features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p className="mb-2">These cookies help us understand how visitors use our site:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Page views and navigation</li>
                    <li>Time spent on pages</li>
                    <li>Error tracking</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Preference Cookies</h3>
                  <p className="mb-2">These cookies remember your settings and preferences:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Language preferences</li>
                    <li>Theme settings</li>
                    <li>Form data</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Cookies</h2>
              <p className="mb-4">We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep you signed in during your visit</li>
                <li>Remember your registration progress</li>
                <li>Improve website performance</li>
                <li>Analyze website usage</li>
                <li>Enhance your user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Managing Cookies</h2>
              <p className="mb-4">You can control cookies through your browser settings:</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <p>Block or delete cookies</p>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <p>Set preferences for different types of cookies</p>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <p>Clear cookies when you close your browser</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
              <p className="mb-4">For questions about our cookie policy, please contact:</p>
              <div className="flex items-center gap-2 text-indigo-300">
                <Mail className="w-5 h-5" />
                <a href="mailto:cse_azura@cmrcet.ac.in" className="hover:text-white transition-colors">
                  cse_azura@cmrcet.ac.in
                </a>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 