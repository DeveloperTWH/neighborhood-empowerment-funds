'use client';

import { useEffect, useState } from 'react';
import { PlusCircle, Trash2, SquarePen, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Faq {
    _id: string;
    question: string;
    answer: string;
}

export default function AdminFaqsPage() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    const [editFaq, setEditFaq] = useState<Faq | null>(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/faq');
            const data = await res.json();
            setFaqs(data);
        } catch {
            toast.error('Failed to load FAQs');
        } finally {
            setLoading(false);
        }
    };

    const addFaq = async () => {
        if (!newQuestion.trim() || !newAnswer.trim()) return;

        try {
            setSubmitting(true);
            const res = await fetch('/api/faq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
            });

            const data = await res.json();
            if (!res.ok) return toast.error(data.error || 'Failed to add FAQ');

            setFaqs(prev => [...prev, data]);
            setNewQuestion('');
            setNewAnswer('');
            toast.success('FAQ added');
        } catch {
            toast.error('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const deleteFaq = async (id: string) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/faq/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok) return toast.error(data.error || 'Failed to delete FAQ');

            setFaqs(prev => prev.filter(f => f._id !== id));
            toast.success('FAQ deleted');
        } catch {
            toast.error('Something went wrong');
        } finally {
            setDeletingId(null);
        }
    };

    const openEditModal = (faq: Faq) => {
        setEditFaq(faq);
        setEditQuestion(faq.question);
        setEditAnswer(faq.answer);
    };

    const saveEdit = async () => {
        if (!editFaq || !editQuestion.trim() || !editAnswer.trim()) return;

        try {
            setSubmitting(true);
            const res = await fetch(`/api/faq/${editFaq._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: editQuestion, answer: editAnswer }),
            });

            const data = await res.json();
            if (!res.ok) return toast.error(data.error || 'Failed to update FAQ');

            setFaqs(prev =>
                prev.map(f => (f._id === editFaq._id ? data : f))
            );
            toast.success('FAQ updated');
            setEditFaq(null);
        } catch {
            toast.error('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-center">Manage FAQs</h1>

                {/* Add FAQ */}
                <div className="bg-white p-4 rounded-lg shadow space-y-3">
                    <input
                        value={newQuestion}
                        onChange={e => setNewQuestion(e.target.value)}
                        placeholder="FAQ Question"
                        className="w-full px-4 py-2 border rounded"
                    />
                    <textarea
                        value={newAnswer}
                        onChange={e => setNewAnswer(e.target.value)}
                        placeholder="FAQ Answer"
                        rows={3}
                        className="w-full px-4 py-2 border rounded"
                    />
                    <button
                        onClick={addFaq}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={submitting}
                    >
                        {submitting ? <Loader2 size={18} className="animate-spin inline" /> : <PlusCircle size={18} className="inline" />}{" "}
                        {submitting ? 'Adding...' : 'Add FAQ'}
                    </button>
                </div>

                {/* List */}
                {loading ? (
                    <p className="text-center text-gray-500 animate-pulse">Loading FAQs...</p>
                ) : faqs.length === 0 ? (
                    <p className="text-center text-gray-500">No FAQs found.</p>
                ) : (
                    <div className="space-y-4">
                        {faqs.map(faq => (
                            <div key={faq._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{faq.question}</p>
                                    <p className="text-sm text-gray-600">{faq.answer}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => openEditModal(faq)} className="text-blue-600">
                                        <SquarePen size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteFaq(faq._id)}
                                        className="text-red-600"
                                        disabled={deletingId === faq._id}
                                    >
                                        {deletingId === faq._id ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editFaq && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow max-w-md w-full space-y-4">
                        <h2 className="text-xl font-semibold">Edit FAQ</h2>
                        <input
                            value={editQuestion}
                            onChange={e => setEditQuestion(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                        />
                        <textarea
                            value={editAnswer}
                            onChange={e => setEditAnswer(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                            rows={3}
                        />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setEditFaq(null)} className="px-4 py-2 bg-gray-200 rounded">
                                Cancel
                            </button>
                            <button
                                onClick={saveEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                disabled={submitting}
                            >
                                {submitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
