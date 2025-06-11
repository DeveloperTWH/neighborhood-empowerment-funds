interface Testimonial {
    _id: string;
    name: string;
    role: string;
    photo: string;
    quote: string;
    rating: number;
}

interface Props {
    testimonials: Testimonial[];
    onEdit: (t: Testimonial) => void;
    refresh: () => void;
    loading: boolean;
}

export default function TestimonialList({ testimonials, onEdit, refresh, loading }: Props) {

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            const res = await fetch(`/api/testimonial/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            refresh();
        } catch (err) {
            console.error(err);
            alert('Error deleting testimonial');
        }
    };


    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Existing Testimonials</h2>
            {loading && <p>Loading...</p>}
            {!loading && testimonials.length === 0 && <p>No testimonials found.</p>}
            <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                    <div key={t._id} className="border rounded p-4 shadow-sm flex gap-4">
                        <img src={t.photo} alt={t.name} className="w-16 h-16 object-cover rounded-full" />
                        <div className="flex-1">
                            <h3 className="font-bold">{t.name}</h3>
                            <p className="text-sm text-gray-600">{t.role}</p>
                            <p className="italic mt-2">"{t.quote}"</p>
                            <p className="text-sm mt-1 text-yellow-600">Rating: {t.rating}/5</p>
                            <div className="mt-3 flex gap-3">
                                <button
                                    className="text-blue-600 underline"
                                    onClick={() => onEdit(t)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-600 underline"
                                    onClick={() => handleDelete(t._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
