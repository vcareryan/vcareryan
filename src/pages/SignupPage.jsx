import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { BookOpen, MessageCircle, Phone, ArrowLeft, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginAs } = useApp();
  const [method, setMethod] = useState('whatsapp'); // 'whatsapp' or 'phone'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'success'
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('otp');
      }, 1500);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length >= 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('success');
        setTimeout(() => {
          loginAs('student', { name: 'Student', phone: `+91 ${phone}` });
          navigate('/select-language');
        }, 1500);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t('signup')}</h1>
            <p className="text-gray-500 mt-1">Create your VidyaPath account</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {step === 'phone' && (
              <>
                {/* Method Toggle */}
                <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setMethod('whatsapp')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
                      method === 'whatsapp' ? 'bg-green-500 text-white shadow' : 'text-gray-600'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setMethod('phone')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
                      method === 'phone' ? 'bg-indigo-500 text-white shadow' : 'text-gray-600'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Phone OTP
                  </button>
                </div>

                {/* Phone Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('enterPhone')}</label>
                  <div className="flex gap-2">
                    <div className="bg-gray-100 rounded-lg px-3 py-3 text-gray-600 font-medium text-sm flex items-center">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={phone.length < 10 || loading}
                  className={`w-full py-4 rounded-xl font-semibold text-white text-lg transition ${
                    method === 'whatsapp' ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      {method === 'whatsapp' ? t('whatsappSignup') : t('phoneSignup')}
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  {method === 'whatsapp' 
                    ? "We'll send a verification code to your WhatsApp" 
                    : "We'll send an OTP via SMS to this number"
                  }
                </p>
              </>
            )}

            {step === 'otp' && (
              <>
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 ${method === 'whatsapp' ? 'bg-green-100' : 'bg-indigo-100'} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    {method === 'whatsapp' ? <MessageCircle className="w-6 h-6 text-green-600" /> : <Phone className="w-6 h-6 text-indigo-600" />}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{t('enterOTP')}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Code sent to +91 {phone} via {method === 'whatsapp' ? 'WhatsApp' : 'SMS'}
                  </p>
                </div>

                <div className="flex gap-3 justify-center mb-6">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[i] = e.target.value;
                        setOtp(newOtp.join(''));
                        if (e.target.value && e.target.nextSibling) {
                          e.target.nextSibling.focus();
                        }
                      }}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={otp.length < 4 || loading}
                  className="w-full py-4 rounded-xl font-semibold text-white text-lg bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : t('verifyOTP')}
                </button>

                <button className="w-full text-center text-indigo-600 font-medium mt-4 py-2 hover:text-indigo-700">
                  {t('resendOTP')}
                </button>
              </>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Account Created!</h2>
                <p className="text-gray-500">Setting up your learning path...</p>
              </div>
            )}
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-indigo-600 font-medium hover:text-indigo-700">
              {t('login')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
