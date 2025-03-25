import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8 text-indigo-400" />
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Privacy Policy
              </h1>
            </div>
            <p className="text-indigo-200">Last updated: March 24, 2025</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8 text-indigo-100">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">When you register for AZURA 2025, we collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal Information (name, email, phone number)</li>
                <li>Academic Details (roll number, section, department, year)</li>
                <li>Event Preferences</li>
                <li>Team Member Information (if applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use your information for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing your event registrations</li>
                <li>Sending event-related communications</li>
                <li>Generating event participation certificates</li>
                <li>Improving our services and user experience</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage and Security</h2>
              <p className="mb-4">Your data is stored securely using:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Supabase for database storage</li>
                <li>Google Sheets for event management</li>
                <li>Encrypted data transmission</li>
                <li>Secure access controls</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
              <p className="mb-4">For privacy-related inquiries, please contact us at:</p>
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