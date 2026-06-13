import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange }) {
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
        <div className="flex items-center justify-center gap-1 py-4">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 0}
                className="p-2 rounded-lg border border-outline hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed text-on-surface-variant hover:text-on-surface transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {start > 0 && (
                <>
                    <button
                        onClick={() => onPageChange(0)}
                        className={`w-10 h-10 rounded-lg border text-label-md ${
                            page === 0 
                                ? 'bg-primary text-white border-primary' 
                                : 'border-outline text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                        }`}
                    >
                        1
                    </button>
                    {start > 1 && <span className="px-2 text-on-surface-variant">...</span>}
                </>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-10 h-10 rounded-lg border text-label-md transition-colors ${
                        page === p 
                            ? 'bg-primary text-white border-primary' 
                            : 'border-outline text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                >
                    {p + 1}
                </button>
            ))}

            {end < totalPages - 1 && (
                <>
                    {end < totalPages - 2 && <span className="px-2 text-on-surface-variant">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages - 1)}
                        className={`w-10 h-10 rounded-lg border text-label-md ${
                            page === totalPages - 1 
                                ? 'bg-primary text-white border-primary' 
                                : 'border-outline text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                        }`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages - 1}
                className="p-2 rounded-lg border border-outline hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed text-on-surface-variant hover:text-on-surface transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}