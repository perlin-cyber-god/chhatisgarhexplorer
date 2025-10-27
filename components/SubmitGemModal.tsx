import React, { useState } from 'react';
import { submitHiddenGem } from '../services/mongoService';
import type { HiddenGem } from '../types';

interface SubmitGemModalProps {
  onClose: () => void;
  onGemSubmitted: (newGem: HiddenGem) => void;
}

const SubmitGemModal: React.FC<SubmitGemModalProps> = ({ onClose, onGemSubmitted }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [userTags, setUserTags] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size cannot exceed 5MB.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !location || !submittedBy || !imageFile) {
      setError('Please fill out all fields and upload an image.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const gemData = {
      name,
      description,
      location,
      submittedBy,
      imageUrl: imagePreview, // Send the Base64 image string
      userTags: userTags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    try {
      const newGem = await submitHiddenGem(gemData);
      onGemSubmitted(newGem);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit gem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 bg-brand-dark/70 z-50 flex justify-center items-center backdrop-blur-sm animate-fade-in-up" onClick={handleBackdropClick} style={{animationDuration: '0.3s'}}>
      <div className="bg-brand-primary p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-lg m-4 max-h-[90vh] overflow-y-auto scrollbar-thin" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-brand-light">Share a Hidden Gem</h2>
          <button onClick={onClose} className="text-brand-accent/70 hover:text-brand-accent text-3xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name of the place*" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-brand-dark/50 border border-brand-primary/50 rounded focus:ring-2 focus:ring-brand-secondary focus:outline-none" required />
          <textarea placeholder="Description*" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 bg-brand-dark/50 border border-brand-primary/50 rounded focus:ring-2 focus:ring-brand-secondary focus:outline-none h-24 resize-none" required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Location (e.g., Near Jagdalpur)*" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-3 bg-brand-dark/50 border border-brand-primary/50 rounded focus:ring-2 focus:ring-brand-secondary focus:outline-none" required />
            <input type="text" placeholder="Your Name*" value={submittedBy} onChange={e => setSubmittedBy(e.target.value)} className="w-full p-3 bg-brand-dark/50 border border-brand-primary/50 rounded focus:ring-2 focus:ring-brand-secondary focus:outline-none" required />
          </div>
          <input type="text" placeholder="Tags (comma separated, e.g. trekking, food)" value={userTags} onChange={e => setUserTags(e.target.value)} className="w-full p-3 bg-brand-dark/50 border border-brand-primary/50 rounded focus:ring-2 focus:ring-brand-secondary focus:outline-none" />
          <div>
            <label className="block text-sm font-medium text-brand-accent/80 mb-2">Upload Image*</label>
            <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} className="w-full text-sm text-brand-accent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-secondary/80 file:text-brand-dark hover:file:bg-brand-secondary" required />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40 w-auto" />}
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="mt-6">
            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-secondary text-brand-dark font-bold py-3 px-6 rounded-lg hover:bg-brand-light disabled:bg-gray-500 disabled:cursor-not-allowed">
              {isSubmitting ? 'Submitting...' : 'Submit Gem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitGemModal;
