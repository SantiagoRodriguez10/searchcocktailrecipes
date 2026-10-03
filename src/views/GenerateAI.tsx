import type { FormEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import { useAppStore } from '../stores/useAppStore'

export default function GenerateAI() {
    const showNotification = useAppStore(
        state => state.showNotification
    )
    const generateRecipe = useAppStore(
        state => state.generateRecipe
    )
    const recipe = useAppStore(state => state.recipe)
    const isGenerating = useAppStore(
        state => state.isGenerating
    )

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        if (isGenerating) return

        const form = new FormData(e.currentTarget)
        const prompt = String(form.get('prompt') ?? '')

        if (prompt.trim() === '') {
            showNotification({
                text: 'La búsqueda no puede ir vacía',
                error: true
            })
            return
        }

        await generateRecipe(prompt)
    }

    return (
        <section className="mx-auto max-w-5xl px-4 py-10">

            {/* TÍTULO */}
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 md:text-6xl">
                    Generar Receta con
                    <span className="text-amber-600"> IA</span>
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                    Descubrí nuevas combinaciones y prepará
                    cócteles increíbles con tus ingredientes favoritos.
                </p>
            </header>

            {/* FORMULARIO */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl"
            >
                <label
                    htmlFor="prompt"
                    className="mb-3 block font-semibold text-slate-700"
                >
                    ¿Qué ingredientes tenés disponibles?
                </label>

                <div className="relative">
                    <input
                        type="text"
                        name="prompt"
                        id="prompt"
                        disabled={isGenerating}
                        placeholder="Ej. Vodka, piña y limón..."
                        className="
              w-full rounded-xl border border-slate-300
              bg-white px-5 py-5 pr-20
              text-slate-800 shadow-sm
              outline-none transition-all
              placeholder:text-slate-400
              focus:border-amber-500
              focus:ring-2 focus:ring-amber-200
              disabled:opacity-60
            "
                    />

                    <button
                        type="submit"
                        aria-label={
                            isGenerating
                                ? 'Generando receta'
                                : 'Generar receta'
                        }
                        disabled={isGenerating}
                        className="
              absolute top-1/2 right-3
              -translate-y-1/2
              cursor-pointer rounded-lg
              bg-amber-500 p-3 text-white
              transition-all duration-200
              hover:bg-amber-600
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </button>
                </div>
            </form>

            {/* ESTADO DE GENERACIÓN */}
            {isGenerating && (
                <div
                    role="status"
                    className="mt-8 flex items-center justify-center gap-3"
                >
                    <span className="animate-pulse text-2xl">
                        🍸
                    </span>

                    <p className="animate-pulse font-medium text-amber-700">
                        Nuestro bartender está preparando tu receta...
                    </p>
                </div>
            )}

            {/* RECETA GENERADA */}
            {recipe && (
                <article
                    aria-label="Receta generada con inteligencia artificial"
                    className="
            mt-10 rounded-2xl border
            border-slate-200 bg-white
            p-6 shadow-xl
            animate-[fadeIn_0.5s_ease-in-out]
            md:p-10
          "
                >
                    <div className="mb-8 flex items-center gap-3 border-b border-slate-200 pb-5">
                        <span className="text-3xl">🍹</span>

                        <div>
                            <p className="text-sm font-medium uppercase tracking-widest text-amber-600">
                                Bartender IA
                            </p>

                            <p className="text-sm text-slate-500">
                                Tu receta personalizada
                            </p>
                        </div>
                    </div>

                    <div aria-live="polite">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => (
                                    <h2 className="mb-5 text-3xl font-extrabold uppercase tracking-tight text-slate-900">
                                        {children}
                                    </h2>
                                ),

                                h2: ({ children }) => (
                                    <h3 className="mt-8 mb-4 border-b border-amber-200 pb-2 text-xl font-bold text-amber-700">
                                        {children}
                                    </h3>
                                ),

                                h3: ({ children }) => (
                                    <h4 className="mt-6 mb-3 text-lg font-semibold text-slate-800">
                                        {children}
                                    </h4>
                                ),

                                p: ({ children }) => (
                                    <p className="my-3 leading-7 text-slate-600">
                                        {children}
                                    </p>
                                ),

                                ul: ({ children }) => (
                                    <ul className="my-4 list-disc space-y-2 pl-6 text-slate-700 marker:text-amber-500">
                                        {children}
                                    </ul>
                                ),

                                ol: ({ children }) => (
                                    <ol className="my-4 list-decimal space-y-3 pl-6 text-slate-700 marker:font-bold marker:text-amber-600">
                                        {children}
                                    </ol>
                                ),

                                li: ({ children }) => (
                                    <li className="leading-7">
                                        {children}
                                    </li>
                                ),

                                strong: ({ children }) => (
                                    <strong className="font-bold text-slate-900">
                                        {children}
                                    </strong>
                                ),

                                blockquote: ({ children }) => (
                                    <blockquote className="my-5 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 px-5 py-3 italic text-slate-700">
                                        {children}
                                    </blockquote>
                                ),

                                hr: () => (
                                    <hr className="my-8 border-slate-200" />
                                )
                            }}
                        >
                            {recipe}
                        </ReactMarkdown>
                    </div>
                </article>
            )}
        </section>
    )
}