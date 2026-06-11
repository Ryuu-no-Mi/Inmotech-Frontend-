import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange, size = 10 }) {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;

    let start = Math.max(0, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages - 1, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
        start = Math.max(0, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 0}
                className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {start > 0 && (
                <>
                    <button
                        onClick={() => onChange(0)}
                        className={`w-10 h-10 rounded-lg border ${page === 0 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
                    >
                        1
                    </button>
                    {start > 1 && <span className="px-2">...</span>}
                </>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`w-10 h-10 rounded-lg border ${
                        page === p ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'
                    }`}
                >
                    {p + 1}
                </button>
            ))}

            {end < totalPages - 1 && (
                <>
                    {end < totalPages - 2 && <span className="px-2">...</span>}
                    <button
                        onClick={() => onChange(totalPages - 1)}
                        className={`w-10 h-10 rounded-lg border ${page === totalPages - 1 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages - 1}
                className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}