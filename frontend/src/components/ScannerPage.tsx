import { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import type { User, MailItem, ActivityLog } from '../App';

type ScannerPageProps = {
  user: User;
  language: 'en' | 'hi';
  onMailCreated: (mailItem: MailItem) => void;
};

export function ScannerPage({ user, language, onMailCreated }: ScannerPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<'ocr' | 'ai' | 'complete' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const translations = {
    en: {
      title: 'Scanner',
      subtitle: 'Upload or capture mail envelope images',
      uploadImage: 'Upload Image',
      takePhoto: 'Take Photo',
      dragDrop: 'Drag and drop an image here',
      or: 'or',
      browseFiles: 'Browse Files',
      processing: 'Processing Image...',
      runningOCR: 'Running OCR on envelope...',
      analysingAddress: 'Analysing address with AI...',
      generatingLabel: 'Generating QR label...',
      complete: 'Processing Complete!',
      viewDetails: 'View Mail Details',
      uploadAnother: 'Upload Another',
      cancel: 'Cancel',
      clear: 'Clear',
      supportedFormats: 'Supported: JPG, PNG, HEIC (Max 10MB)',
      preview: 'Image Preview',
      processingInfo: 'The system will automatically extract text, validate addresses, and suggest routing.',
    },
    hi: {
      title: 'स्कैनर',
      subtitle: 'मेल लिफाफे की छवियां अपलोड या कैप्चर करें',
      uploadImage: 'छवि अपलोड करें',
      takePhoto: 'फोटो लें',
      dragDrop: 'यहां एक छवि खींचें और छोड़ें',
      or: 'या',
      browseFiles: 'फाइलें ब्राउज़ करें',
      processing: 'छवि प्रोसेस हो रही है...',
      runningOCR: 'लिफाफे पर OCR चल रहा है...',
      analysingAddress: 'AI के साथ पता विश्लेषण...',
      generatingLabel: 'QR लेबल जनरेट हो रहा है...',
      complete: 'प्रसंस्करण पूर्ण!',
      viewDetails: 'मेल विवरण देखें',
      uploadAnother: 'एक और अपलोड करें',
      cancel: 'रद्द करें',
      clear: 'साफ करें',
      supportedFormats: 'समर्थित: JPG, PNG, HEIC (अधिकतम 10MB)',
      preview: 'छवि पूर्वावलोकन',
      processingInfo: 'सिस्टम स्वचालित रूप से टेक्स्ट निकालेगा, पते को मान्य करेगा और रूटिंग सुझाएगा।',
    },
  };

  const t = translations[language];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const clearImage = () => {
    setSelectedImage(null);
    setProcessingStage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const processImage = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);

    // Simulate OCR processing
    setProcessingStage('ocr');
    const blob = await fetch(selectedImage).then(r => r.blob());

    const formData = new FormData();
    formData.append('file', blob);

    const res = await fetch("http://127.0.0.1:8000/scan/envelope", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate AI analysis
    setProcessingStage('ai');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mail item ID
    const mailId = `MAIL-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Mock OCR and AI results
    const mockOCRText = data;
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%

    const initialActivityLog: ActivityLog = {
      id: `ACT-${Date.now()}-1`,
      timestamp,
      action: 'upload',
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      details: `Image uploaded and OCR processing initiated`,
      reasonCode: undefined,
      fieldChanges: undefined,
    };

    const newMailItem: MailItem = {
      id: mailId,
      timestamp,
      scannedImage: selectedImage,
      ocrText: mockOCRText,
      parsedFields: {
        name: 'Mr. Ramesh Sharma',
        houseNo: '45',
        street: 'Gandhi Nagar',
        locality: 'Gandhi Nagar',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302015',
      },
      originalPincode: '302015',
      aiSuggestion: {
        correctedPincode: '302015',
        deliveryHub: 'DH-302',
        nodalCenter: 'NC-30',
        confidence,
        flags: confidence < 85 ? ['Low confidence', 'Manual review suggested'] : [],
        reasoning: confidence > 85 
          ? 'High confidence match. All fields validated successfully.'
          : 'Address fields extracted but manual verification recommended.',
      },
      status: confidence > 85 ? 'routed' : 'pending',
      confidence,
      qrCode: `QR-${mailId}`,
      history: [{
        id: `HIST-${Date.now()}`,
        timestamp,
        action: 'Created',
        user: user.name,
        changes: 'Mail item created and processed',
      }],
      activityLog: [initialActivityLog],
      needsReview: confidence < 85,
      uploadedBy: user.id,
      uploadedByName: user.name,
      uploadedByRole: user.role,
      center: user.center,
    };

    setProcessingStage('complete');
    await new Promise(resolve => setTimeout(resolve, 800));

    // Call the callback to add this mail to the system
    onMailCreated(newMailItem);
    
    setIsProcessing(false);
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Main Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {!selectedImage ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-400 transition-colors"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <ImageIcon className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-900 mb-2">{t.dragDrop}</p>
                <p className="text-gray-500 text-sm mb-4">{t.or}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    {t.uploadImage}
                  </button>
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    {t.takePhoto}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-4">{t.supportedFormats}</p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900">{t.preview}</h3>
              {!isProcessing && !processingStage && (
                <button
                  onClick={clearImage}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  {t.clear}
                </button>
              )}
            </div>

            {/* Image Preview */}
            <div className="relative">
              <img
                src={selectedImage}
                alt="Scanned envelope"
                className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
              />
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin mt-0.5" />
                  <div className="flex-1">
                    <p className="text-blue-900 mb-2">{t.processing}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        {processingStage === 'ocr' ? (
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        )}
                        <span className={processingStage === 'ocr' ? 'text-blue-700' : 'text-green-700'}>
                          {t.runningOCR}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {processingStage === 'ai' ? (
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        ) : processingStage === 'complete' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={
                          processingStage === 'ai' ? 'text-blue-700' : 
                          processingStage === 'complete' ? 'text-green-700' : 'text-gray-500'
                        }>
                          {t.analysingAddress}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {processingStage === 'complete' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={processingStage === 'complete' ? 'text-green-700' : 'text-gray-500'}>
                          {t.generatingLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {processingStage === 'complete' && !isProcessing && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-green-900">{t.complete}</p>
                    <p className="text-green-700 text-sm mt-1">
                      Mail item has been created and is ready for review.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {!isProcessing && !processingStage && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                  <p className="text-gray-600 text-sm">{t.processingInfo}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={processImage}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Loader2 className="w-4 h-4" />
                    Process & Create Mail Item
                  </button>
                  <button
                    onClick={clearImage}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            )}

            {processingStage === 'complete' && !isProcessing && (
              <div className="flex gap-3">
                <button
                  onClick={clearImage}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  {t.uploadAnother}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Camera className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-900">Image Quality</span>
          </div>
          <p className="text-xs text-gray-600">
            Ensure envelope is well-lit and text is clearly visible
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm text-gray-900">Auto-Processing</span>
          </div>
          <p className="text-xs text-gray-600">
            High confidence items are automatically routed
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm text-gray-900">Manual Review</span>
          </div>
          <p className="text-xs text-gray-600">
            Low confidence items are flagged for your review
          </p>
        </div>
      </div>
    </div>
  );
}
