'use client';

import { useEffect, useState, useRef } from 'react';
import TestimonialForm from './components/TestimonialForm';
import TestimonialList from './components/TestimonialList';

interface Testimonial {
    _id: string;
    name: string;
    role: string;
    photo: string;
    quote: string;
    rating: number;
}


export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [selected, setSelected] = useState<Testimonial | null>(null);
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    const loadTestimonials = async () => {
        const res = await fetch('/api/testimonial');
        const data = await res.json();
        setTestimonials(data);
    };

    useEffect(() => {
        loadTestimonials();
    }, []);


    const fetchTestimonials = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/testimonial');
            const data = await res.json();
            setTestimonials(data);
        } catch (err) {
            console.error('Failed to load testimonials:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>
            <div ref={formRef}>
                <TestimonialForm
                    selected={selected}
                    onSuccess={fetchTestimonials}
                    clearSelected={() => setSelected(null)}
                />
            </div>

            <hr className="my-6" />

            <TestimonialList
                testimonials={testimonials}
                onEdit={(t) => {
                    setSelected(t);
                    scrollToForm();
                }}
                refresh={fetchTestimonials}
                loading={loading}
            />

        </div>
    );
}
