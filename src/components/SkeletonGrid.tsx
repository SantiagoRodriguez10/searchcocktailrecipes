// src/components/SkeletonGrid.tsx
export default function SkeletonGrid() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Título de mentira */}
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />

            {/* Grid de tarjetas simuladas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-4 shadow-sm animate-pulse">
                        <div className="h-48 bg-slate-200 rounded-md mb-4" />
                        <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-slate-200 rounded w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    )
}