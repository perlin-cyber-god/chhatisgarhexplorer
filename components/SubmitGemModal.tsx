import React, { useState, FormEvent, ChangeEvent } from 'react';
import { submitHiddenGem } from '../services/mongoService';
import type { HiddenGem } from '../types';

interface SubmitGemModalProps {
  onClose: () => void;
  onGemSubmitted: (newGem: HiddenGem) => void;
}

const SubmitGemModal: React.FC<SubmitGemModalProps> = ({ onClose, onGemSubmitted }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (jpeg, png, etc.).');
        return;
    }
    
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      // The result is a Base64 string, perfect for sending via JSON
      setImageBase64(reader.result as string);
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !description || !imageBase64 || !submittedBy || !tags) {
      setError('Please fill out all fields and upload an image.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const newGemData: Omit<HiddenGem, '_id'> = {
        name,
        description,
        imageUrl: imageBase64, // Send the Base64 string to the backend
        submittedBy,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };
      const submittedGem = await submitHiddenGem(newGemData);
      onGemSubmitted(submittedGem); // Update the UI instantly
      onClose(); // Close the modal on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit gem. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal if the user clicks the dark overlay
    if (e.target === e.currentTarget && !isLoading) {
        onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-brand-dark/70 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in-up" 
      style={{ animationDuration: '0.3s' }} 
      onClick={handleBackgroundClick}
    >
      <div className="bg-brand-primary p-8 rounded-lg shadow-2xl w-full max-w-lg m-4 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} disabled={isLoading} className="absolute top-4 right-4 text-brand-accent hover:text-brand-secondary disabled:opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-3xl font-serif text-brand-secondary font-bold mb-6">Share a Hidden Gem</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gem-name" className="block text-brand-light font-semibold mb-2 text-sm">Gem Name</label>
              <input id="gem-name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none text-brand-accent" placeholder="e.g., Secret Waterfall" disabled={isLoading} required />
            </div>
            <div>
              <label htmlFor="gem-author" className="block text-brand-light font-semibold mb-2 text-sm">Your Name/Handle</label>
              <input id="gem-author" type="text" value={submittedBy} onChange={e => setSubmittedBy(e.target.value)} className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none text-brand-accent" placeholder="e.g., Traveler_Alex" disabled={isLoading} required/>
            </div>
          </div>
          <div>
            <label htmlFor="gem-desc" className="block text-brand-light font-semibold mb-2 text-sm">Description</label>
            <textarea id="gem-desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none text-brand-accent" placeholder="What makes it special?" disabled={isLoading} required></textarea>
          </div>
           <div>
              <label htmlFor="gem-image-upload" className="block text-brand-light font-semibold mb-2 text-sm">Upload Image</label>
              <input id="gem-image-upload" type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-brand-accent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-secondary file:text-brand-dark hover:file:bg-brand-light" disabled={isLoading} required/>
            </div>
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40 w-auto mx-auto"/>}
          <div>
            <label htmlFor="gem-tags" className="block text-brand-light font-semibold mb-2 text-sm">Tags (comma-separated)</label>
            <input id="gem-tags" type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full p-3 bg-brand-dark/50 border-2 border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none text-brand-accent" placeholder="e.g., nature, trekking, peaceful" disabled={isLoading} required/>
          </div>
          
          {error && <p className="text-red-400 text-center text-sm">{error}</p>}

          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full bg-brand-secondary text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-brand-light transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex justify-center items-center">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Gem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitGemModal;
