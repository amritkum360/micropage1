'use client';

import { useState, useEffect } from 'react';
import { X, Check, Globe, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import useNotification from '@/hooks/useNotification';
import { useAuth } from '@/contexts/AuthContext';
import { generateWebsiteContent } from '@/services/aiService';

const OnboardingModal = ({ isOpen, onComplete, user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    websiteName: '',
    subdomain: '',
    businessDescription: '',
    aiGeneratedContent: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [subdomainStatus, setSubdomainStatus] = useState({ checking: false, available: null, message: '' });
  const { showError, showSuccess } = useNotification();
  const { completeOnboarding, token, checkSubdomain } = useAuth();

  // Debounced subdomain checking
  const checkSubdomainAvailability = async (subdomain) => {
    if (!subdomain || subdomain.length < 3) {
      setSubdomainStatus({ checking: false, available: null, message: '' });
      return;
    }

    setSubdomainStatus({ checking: true, available: null, message: 'Checking availability...' });

    try {
      const result = await checkSubdomain(subdomain);
      setSubdomainStatus({
        checking: false,
        available: result.available,
        message: result.message
      });
    } catch (error) {
      setSubdomainStatus({
        checking: false,
        available: false,
        message: 'Error checking subdomain'
      });
    }
  };

  // Debounce subdomain checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.subdomain) {
        checkSubdomainAvailability(formData.subdomain);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [formData.subdomain, checkSubdomainAvailability]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        websiteName: '',
        subdomain: '',
        businessDescription: '',
        aiGeneratedContent: null
      });
      setErrors({});
      setIsGeneratingAI(false);
      setSubdomainStatus({ checking: false, available: null, message: '' });
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };


  const handleGenerateAI = async () => {
    if (!formData.businessDescription || formData.businessDescription.trim().length < 10) {
      showError('Please provide a detailed business description (at least 10 characters)');
      return;
    }

    setIsGeneratingAI(true);
    try {
      console.log('🤖 Starting AI content generation...');
      
      const result = await generateWebsiteContent(formData.businessDescription, token);
      
      setFormData(prev => ({
        ...prev,
        aiGeneratedContent: result.content
      }));
      
      showSuccess('🎉 AI content generated successfully!');
      console.log('✅ AI content generated:', result.content);
    } catch (error) {
      console.error('❌ AI generation error:', error);
      showError(`Failed to generate AI content: ${error.message}`);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateAndCreate = async () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    try {
      let aiGeneratedContent = formData.aiGeneratedContent;
      
      // First generate AI content if not already generated
      if (!aiGeneratedContent) {
        console.log('🤖 Starting AI content generation...');
        setIsGeneratingAI(true);
        
        const aiResult = await generateWebsiteContent(formData.businessDescription, token);
        aiGeneratedContent = aiResult.content;
        
        setFormData(prev => ({
          ...prev,
          aiGeneratedContent: aiGeneratedContent
        }));
        
        console.log('✅ AI content generated:', aiGeneratedContent);
        console.log('🔍 AI content structure:', {
          tagline: aiGeneratedContent?.tagline,
          heroTitle: aiGeneratedContent?.heroTitle,
          heroSubtitle: aiGeneratedContent?.heroSubtitle,
          heroDescription: aiGeneratedContent?.heroDescription,
          aboutTitle: aiGeneratedContent?.aboutTitle,
          aboutDescription: aiGeneratedContent?.aboutDescription
        });
        setIsGeneratingAI(false);
      }

      // Then create the website
      console.log('🚀 Starting onboarding completion with data:', {
        websiteName: formData.websiteName,
        subdomain: formData.subdomain,
        businessDescription: formData.businessDescription,
        selectedSections: formData.selectedSections,
        aiGeneratedContent: aiGeneratedContent,
        selectedTheme: formData.selectedTheme
      });

      // Use default sections and theme since we removed those steps
      const defaultSections = ['header', 'hero', 'about', 'contact', 'footer'];
      const defaultTheme = 'default';

      const result = await completeOnboarding({
        websiteName: formData.websiteName,
        subdomain: formData.subdomain,
        businessDescription: formData.businessDescription,
        selectedSections: defaultSections,
        aiGeneratedContent: aiGeneratedContent,
        selectedTheme: defaultTheme
      });

      console.log('✅ Onboarding completed successfully:', result);
      
      // Show success message
      showSuccess('🎉 Welcome! Your website has been created successfully!');
      
      // Wait a moment for the success message to be visible
      setTimeout(() => {
        console.log('🚀 Calling onComplete with result:', result);
        onComplete(result.user);
      }, 1500);
    } catch (error) {
      console.error('❌ Onboarding completion error:', error);
      showError(`❌ Failed to complete onboarding: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
      setIsGeneratingAI(false);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.websiteName.trim()) {
        newErrors.websiteName = 'Website name is required';
      } else if (formData.websiteName.length < 2) {
        newErrors.websiteName = 'Website name must be at least 2 characters';
      }

      if (!formData.subdomain.trim()) {
        newErrors.subdomain = 'Subdomain is required';
      } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
        newErrors.subdomain = 'Subdomain can only contain lowercase letters, numbers, and hyphens';
      } else if (formData.subdomain.length < 3) {
        newErrors.subdomain = 'Subdomain must be at least 3 characters';
      } else if (subdomainStatus.checking) {
        newErrors.subdomain = 'Please wait while we check subdomain availability';
      } else if (subdomainStatus.available === false) {
        newErrors.subdomain = 'This subdomain is not available';
      }
    }

    if (step === 2) {
      if (!formData.businessDescription.trim()) {
        newErrors.businessDescription = 'Business description is required';
      } else if (formData.businessDescription.trim().length < 10) {
        newErrors.businessDescription = 'Business description must be at least 10 characters long';
      }
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome to MicroPage</h2>
            <p className="text-sm text-gray-600">Let&apos;s create your amazing website</p>
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-1">Step {currentStep} of 2</div>
              <div className="w-24 bg-gray-200 rounded-full h-1 mx-auto">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          {currentStep === 1 && (
            <div className="space-y-4">

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website Name
                  </label>
                  <input
                    type="text"
                    value={formData.websiteName}
                    onChange={(e) => handleInputChange('websiteName', e.target.value)}
                    placeholder="Enter your website name"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.websiteName ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.websiteName && (
                    <p className="mt-1 text-sm text-red-600">{errors.websiteName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subdomain
                  </label>
                  <div className="flex items-center">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={formData.subdomain}
                        onChange={(e) => handleInputChange('subdomain', e.target.value.toLowerCase())}
                        placeholder="mybusiness"
                        className={`w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.subdomain ? 'border-red-300' : 
                          subdomainStatus.available === true ? 'border-green-300' :
                          subdomainStatus.available === false ? 'border-red-300' : ''
                        }`}
                      />
                      {subdomainStatus.checking && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                      {!subdomainStatus.checking && subdomainStatus.available === true && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                      {!subdomainStatus.checking && subdomainStatus.available === false && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-sm">
                      .jirocash.com
                    </div>
                  </div>
                  {errors.subdomain && (
                    <p className="mt-1 text-sm text-red-600">{errors.subdomain}</p>
                  )}
                  {subdomainStatus.message && !errors.subdomain && (
                    <p className={`mt-1 text-xs ${
                      subdomainStatus.available === true ? 'text-green-600' :
                      subdomainStatus.available === false ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {subdomainStatus.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Your website will be available at: <span className="font-medium text-blue-600">
                      {formData.subdomain || 'yourname'}.jirocash.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Description
                  </label>
                  <textarea
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    placeholder="Describe your business, services, and what makes you unique..."
                    rows={4}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.businessDescription ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.businessDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessDescription}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.businessDescription.length}/500 characters
                  </p>
                </div>

                {/* AI Generated Content Preview */}
                {formData.aiGeneratedContent && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center text-sm">
                      <Sparkles className="h-4 w-4 mr-1" />
                      AI Generated Content
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium text-blue-800">Tagline:</span>
                        <p className="text-blue-700">{formData.aiGeneratedContent.tagline}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-800">Hero Title:</span>
                        <p className="text-blue-700">{formData.aiGeneratedContent.heroTitle}</p>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            </div>
          )}


        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
          )}
          
          <div className="flex-1"></div>
          
          {currentStep < 2 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleGenerateAndCreate}
              disabled={isSubmitting || isGeneratingAI}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting || isGeneratingAI ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isGeneratingAI ? 'Generating AI Content...' : 'Creating Website...'}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate & Create Website
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
