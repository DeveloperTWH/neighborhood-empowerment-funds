'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Section = { title: string; description: string };

interface CampaignFormData {
  title: string;
  description: string;
  logoFile: File | null;
  galleryFiles: File[];
  fundingTarget: string;
  amountRaised: string;
  investorCount: string;
  equityOffered: string;
  preMoneyValuation: string;
  sharePrice: string;
  additionalInvestment: string;
  website: string;
  companiesHouseLink: string;
  linkedinLink: string;
  instagramLink: string;
  facebookLink: string;
  sections: Section[];
  deadline: string;
  categories: string[];
  valueHighlights: string[];
}

export default function CreateCampaignForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    logoFile: null,
    galleryFiles: [],
    fundingTarget: '',
    amountRaised: '0',
    investorCount: '0',
    equityOffered: '',
    preMoneyValuation: '',
    sharePrice: '',
    additionalInvestment: '',
    website: '',
    companiesHouseLink: '',
    linkedinLink: '',
    instagramLink: '',
    facebookLink: '',
    sections: [{ title: '', description: '' }],
    deadline: '',
    categories: [''],
    valueHighlights: [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logoFile' | 'galleryFiles'
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'galleryFiles') {
      setFormData(prev => ({
        ...prev,
        galleryFiles: [...prev.galleryFiles, ...Array.from(files)],
      }));
    } else {
      setFormData(prev => ({ ...prev, logoFile: files[0] || null }));
    }
  };

  const handleSectionChange = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...formData.sections];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, sections: updated }));
  };

  const addSection = () => {
    setFormData(prev => ({ ...prev, sections: [...prev.sections, { title: '', description: '' }] }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updated = [...formData.categories];
    updated[index] = value;
    setFormData(prev => ({ ...prev, categories: updated }));
  };

  const addCategory = () => {
    setFormData(prev => ({ ...prev, categories: [...prev.categories, ''] }));
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
  };

  const handleKeyHighlightChange = (index: number, value: string) => {
    const updated = [...formData.valueHighlights];
    updated[index] = value;
    setFormData(prev => ({ ...prev, valueHighlights: updated }));
  };

  const addKeyHighlight = () => {
    setFormData(prev => ({ ...prev, valueHighlights: [...prev.valueHighlights, ''] }));
  };

  const removeKeyHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      valueHighlights: prev.valueHighlights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('fundingTarget', formData.fundingTarget);
    form.append('equityOffered', formData.equityOffered);
    form.append('preMoneyValuation', formData.preMoneyValuation);
    form.append('sharePrice', formData.sharePrice);
    form.append('additionalInvestment', formData.additionalInvestment);
    form.append('website', formData.website);
    form.append('companiesHouseLink', formData.companiesHouseLink);
    form.append('linkedinLink', formData.linkedinLink);
    form.append('instagramLink', formData.instagramLink);
    form.append('facebookLink', formData.facebookLink);
    form.append('deadline', formData.deadline);

    if (formData.logoFile) form.append('logoFile', formData.logoFile);
    formData.galleryFiles.forEach(file => form.append('galleryFiles', file));

    form.append('categories', JSON.stringify(formData.categories));
    form.append('sections', JSON.stringify(formData.sections));
    form.append('valueHighlights', JSON.stringify(formData.valueHighlights)); // updated key here

    try {
      Object.entries(formData).forEach(([key, value]) => {
  console.log(key, value);
});


      const res = await fetch('/api/campaigns', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) throw new Error('Failed to create campaign');

      alert('Campaign created successfully!');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error creating campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
      noValidate
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Create Campaign</h2>

      <input
        name="title"
        placeholder="Campaign Title"
        value={formData.title}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="input input-bordered w-full min-h-[100px]"
        required
      />

      {/* Logo File Upload */}
      <div>
        <label className="block font-semibold mb-1">Logo Upload</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => handleFileChange(e, 'logoFile')}
          className="input input-bordered w-full"
          required
        />
        {formData.logoFile && (
          <img
            src={URL.createObjectURL(formData.logoFile)}
            alt="Logo preview"
            className="h-24 mt-3 rounded-md object-contain"
          />
        )}
      </div>

      {/* Funding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="fundingTarget"
          placeholder="Funding Target"
          type="number"
          value={formData.fundingTarget}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          name="equityOffered"
          placeholder="Equity Offered (%)"
          type="number"
          value={formData.equityOffered}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          name="preMoneyValuation"
          placeholder="Pre-money Valuation"
          type="number"
          value={formData.preMoneyValuation}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="sharePrice"
          placeholder="Share Price"
          type="number"
          value={formData.sharePrice}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          name="additionalInvestment"
          placeholder="Additional Investment"
          type="number"
          value={formData.additionalInvestment}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="website"
          placeholder="Website URL"
          value={formData.website}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          name="companiesHouseLink"
          placeholder="Companies House Link"
          value={formData.companiesHouseLink}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          name="linkedinLink"
          placeholder="LinkedIn"
          value={formData.linkedinLink}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          name="instagramLink"
          placeholder="Instagram"
          value={formData.instagramLink}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          name="facebookLink"
          placeholder="Facebook"
          value={formData.facebookLink}
          onChange={handleChange}
          className="input input-bordered"
        />
      </div>

      {/* Gallery Files Upload */}
      <div>
        <label className="block font-semibold mb-1">Gallery Image Upload</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={e => handleFileChange(e, 'galleryFiles')}
          className="input input-bordered w-full"
        />
        {formData.galleryFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {formData.galleryFiles.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`Gallery ${i}`}
                className="h-24 rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {/* Key Highlights */}
      <div>
        <label className="block font-semibold mb-1">Key Highlights</label>
        {formData.valueHighlights.map((highlight, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Highlight"
              value={highlight}
              onChange={e => handleKeyHighlightChange(i, e.target.value)}
              className="input input-bordered flex-grow"
            />
            <button
              type="button"
              onClick={() => removeKeyHighlight(i)}
              className="btn btn-error btn-sm px-3 h-8 rounded"
              aria-label={`Remove highlight ${i + 1}`}
              disabled={formData.valueHighlights.length === 1}
            >
              &minus;
            </button>
            {i === formData.valueHighlights.length - 1 && (
              <button
                type="button"
                onClick={addKeyHighlight}
                className="btn btn-outline btn-sm px-3 h-8 rounded"
                aria-label="Add highlight"
              >
                &#43;
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Sections */}
      <div>
        <label className="block font-semibold mb-1">Sections</label>
        {formData.sections.map((section, i) => (
          <div key={i} className="border p-4 mb-4 rounded-md">
            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={e => handleSectionChange(i, 'title', e.target.value)}
              className="input input-bordered w-full mb-2"
              required
            />
            <textarea
              placeholder="Section Description"
              value={section.description}
              onChange={e => handleSectionChange(i, 'description', e.target.value)}
              className="input input-bordered w-full min-h-[80px]"
              required
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => removeSection(i)}
                className="btn btn-error btn-sm"
                disabled={formData.sections.length === 1}
              >
                Remove Section
              </button>
              {i === formData.sections.length - 1 && (
                <button
                  type="button"
                  onClick={addSection}
                  className="btn btn-outline btn-sm"
                >
                  Add Section
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div>
        <label className="block font-semibold mb-1">Categories</label>
        {formData.categories.map((cat, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Category"
              value={cat}
              onChange={e => handleCategoryChange(i, e.target.value)}
              className="input input-bordered flex-grow"
            />
            <button
              type="button"
              onClick={() => removeCategory(i)}
              className="btn btn-error btn-sm px-3 h-8 rounded"
              aria-label={`Remove category ${i + 1}`}
              disabled={formData.categories.length === 1}
            >
              &minus;
            </button>
            {i === formData.categories.length - 1 && (
              <button
                type="button"
                onClick={addCategory}
                className="btn btn-outline btn-sm px-3 h-8 rounded"
                aria-label="Add category"
              >
                &#43;
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className={`btn btn-primary w-full py-3 text-lg font-semibold ${loading ? 'loading' : ''}`}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Campaign'}
      </button>
    </form>
  );
}
