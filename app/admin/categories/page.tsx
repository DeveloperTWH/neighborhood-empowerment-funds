'use client';

import { useEffect, useState } from 'react';
import { PlusCircle, Trash2, SquarePen, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
    _id: string;
    name: string;
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editName, setEditName] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/category');
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch categories');
        } finally {
            setInitialLoading(false);
        }
    };

    const addCategory = async () => {
        if (!newCategory.trim()) return;
        try {
            const capitalizedName = capitalizeFirstLetter(newCategory.trim());
            setLoading(true);
            const res = await fetch('/api/category', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: capitalizedName }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Failed to add category');
            } else {
                setCategories(prev => [...prev, data]);
                toast.success('Category added');
                setNewCategory('');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (_id: string) => {
        try {
            setDeleteLoadingId(_id);
            const res = await fetch(`/api/category/${_id}`, { method: 'DELETE' });
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Failed to delete category');
            } else {
                setCategories(categories.filter(cat => cat._id !== _id));
                toast.success('Category deleted');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        } finally {
            setDeleteLoadingId(null);
        }
    };

    const openEditModal = (cat: Category) => {
        setEditingCategory(cat);
        setEditName(cat.name);
    };

    const saveEdit = async () => {
        if (editingCategory && editName.trim()) {
            try {
                setUpdateLoading(true);
                const capitalized = capitalizeFirstLetter(editName.trim());
                const res = await fetch(`/api/category/${editingCategory._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: capitalized }),
                });


                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.error || 'Failed to update category');
                    return;
                }

                setCategories(categories.map(cat =>
                    cat._id === editingCategory._id ? data : cat
                ));
                toast.success('Category updated');
                setEditingCategory(null);
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong');
            } finally {
                setUpdateLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Categories</h1>
                    <p className="text-gray-500">Create, update, and organize your platform categories.</p>
                </div>

                {/* Add Category */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row gap-4 items-center">
                    <input
                        value={newCategory}
                        onChange={(e) => setNewCategory(capitalizeFirstLetter(e.target.value))}
                        placeholder="Enter a new category name"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        onClick={addCategory}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <PlusCircle size={20} />}
                        {loading ? 'Adding...' : 'Add Category'}
                    </button>
                </div>

                {/* Category List */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {initialLoading ? (
                        <div className="col-span-full text-center text-gray-500 py-10 animate-pulse">
                            Loading categories...
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No categories found. Start by adding one above.
                        </div>
                    ) : (
                        categories.map((cat) => (
                            <div
                                key={cat._id}
                                className="bg-white rounded-lg shadow-md p-5 flex justify-between items-center"
                            >
                                <span className="font-medium text-gray-800">{cat.name}</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 transition"
                                        title="Edit"
                                        onClick={() => openEditModal(cat)}
                                    >
                                        <SquarePen size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(cat._id)}
                                        className="text-red-600 hover:text-red-800 transition"
                                        title="Delete"
                                        disabled={deleteLoadingId === cat._id}
                                    >
                                        {deleteLoadingId === cat._id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {editingCategory && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
                        <input
                            value={editName}
                            onChange={(e) => setEditName(capitalizeFirstLetter(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditingCategory(null)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                disabled={updateLoading}
                            >
                                {updateLoading ? <Loader2 size={18} className="animate-spin inline" /> : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
