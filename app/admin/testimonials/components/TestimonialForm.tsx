'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  photo: string;
  quote: string;
  rating: number;
}

interface Props {
  selected: Testimonial | null;
  onSuccess: () => void;
  clearSelected: () => void;
}

export default function TestimonialForm({ selected, onSuccess, clearSelected }: Props) {
  const [form, setForm] = useState<Omit<Testimonial, '_id' | 'photo'> & { photo: File | null }>({
    name: '',
    role: '',
    quote: '',
    rating: 0,
    photo: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        role: selected.role,
        quote: selected.quote,
        rating: selected.rating,
        photo: null,
      });
    }
  }, [selected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.rating < 0 || form.rating > 5) {
      alert('Rating must be between 0 and 5');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name.trim());
    formData.append('role', form.role.trim());
    formData.append('quote', form.quote.trim());
    formData.append('rating', String(form.rating));
    if (form.photo) formData.append('photo', form.photo);
    if (!selected && !form.photo) {
      toast("Please upload The Photos !");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        selected ? `/api/testimonial/${selected._id}` : '/api/testimonial',
        {
          method: selected ? 'PUT' : 'POST',
          body: formData,
        }
      );

      if (!res.ok) throw new Error('Failed to submit testimonial');

      setForm({ name: '', role: '', quote: '', rating: 0, photo: null });
      clearSelected();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Error saving testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="border w-full px-3 py-2"
      />
      <input
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Role"
        required
        className="border w-full px-3 py-2"
      />
      <textarea
        name="quote"
        value={form.quote}
        onChange={handleChange}
        placeholder="Quote"
        required
        className="border w-full px-3 py-2"
      />
      <input
        type="number"
        name="rating"
        value={isNaN(form.rating) ? '' : form.rating}
        onChange={handleChange}
        placeholder="Rating (0-5)"
        min={0}
        max={5}
        step="0.1"
        required
        className="border w-full px-3 py-2"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Saving...' : selected ? 'Update' : 'Add'} Testimonial
        </button>
        {selected && (
          <button type="button" onClick={clearSelected} className="text-gray-600">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
