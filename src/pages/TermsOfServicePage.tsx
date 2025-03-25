import { motion } from 'framer-motion';
import { ArrowLeft, Scale, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsOfServicePage() {
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
              <Scale className="w-8 h-8 text-indigo-400" />
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Terms of Service
              </h1>
            </div>
            <p className="text-indigo-200">Last updated: March 24, 2025</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8 text-indigo-100">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Event Participation</h2>
              <p className="mb-4">By registering for AZURA 2025, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Follow all event rules and guidelines</li>
                <li>Respect other participants and event organizers</li>
                <li>Maintain appropriate conduct during events</li>
                <li>Comply with venue-specific regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Registration Rules</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>Registration is open to all currently enrolled students</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>Each participant can register for multiple events</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>Team events require all members to be registered</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Prohibited Activities</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p>Plagiarism or cheating in any form</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p>Harassment or discrimination</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p>Damage to venue property or equipment</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p>Unauthorized access to restricted areas</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Liability and Responsibility</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p>Participants are responsible for their personal belongings</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p>Event organizers reserve the right to modify event schedules</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p>Participants must follow safety guidelines</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Information</h2>
              <p className="mb-4">For questions about these terms, please contact:</p>
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