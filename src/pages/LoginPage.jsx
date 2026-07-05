import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { BookOpen, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginAs } = useApp();
  const [method, setMethod] = useState('whatsapp');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('student');

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginAs(role, { name: role === 'admin' ? 'Admin User' : role === 'parent' ? 'Parent User' : 'Arjun Kumar', phone: '+91 98765 43210' });
      if (role === 'admin') navigate('/admin');
      else if (role === 'parent') navigate('/parent');
      else navigate('/select-language');
    }, 1500);
  };

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
        loginAs(role, { name: role === 'parent' ? 'Parent User' : 'Arjun Kumar', phone: `+91 ${phone}` });
        if (role === 'admin') navigate('/admin');
        else if (role === 'parent') navigate('/parent');
        else navigate('/select-language');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t('login')}</h1>
            <p className="text-gray-500 mt-1">Welcome back to VidyaPath</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Role Selector */}
            <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-xl">
              {[
                { id: 'student', label: 'Student' },
                { id: 'parent', label: 'Parent' },
                { id: 'admin', label: 'Admin' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition ${
                    role === r.id ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {step === 'phone' && (
              <>
                {/* Method Toggle for non-admin */}
                {role !== 'admin' && (
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
                      onClick={() => setMethod('google')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
                        method === 'google' ? 'bg-white text-gray-700 shadow border' : 'text-gray-600'
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Google
                    </button>
                  </div>
                )}

                {(method === 'google' || role === 'admin') ? (
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-semibold text-gray-700 text-lg border-2 border-gray-300 hover:border-gray-400 transition flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        {role === 'admin' ? 'Sign in with Google Workspace' : t('googleLogin')}
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('enterPhone')}</label>
                      <div className="flex gap-2">
                        <div className="bg-gray-100 rounded-lg px-3 py-3 text-gray-600 font-medium text-sm flex items-center">+91</div>
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
                      className="w-full py-4 rounded-xl font-semibold text-white text-lg bg-green-500 hover:bg-green-600 transition disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : t('whatsappLogin')}
                    </button>
                  </>
                )}
              </>
            )}

            {step === 'otp' && (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{t('enterOTP')}</h2>
                  <p className="text-sm text-gray-500 mt-1">Code sent via WhatsApp to +91 {phone}</p>
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

                <button className="w-full text-center text-indigo-600 font-medium mt-4 py-2">{t('resendOTP')}</button>
              </>
            )}
          </div>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-indigo-600 font-medium hover:text-indigo-700">
              {t('signup')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
