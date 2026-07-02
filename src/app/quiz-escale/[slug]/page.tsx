import { notFound } from 'next/navigation';
import { getQuizBySlug, getAllQuizSlugs } from '@/lib/quiz';
import { EscaleQuiz } from '@/components/EscaleQuiz';

export function generateStaticParams() {
  return getAllQuizSlugs().map(slug => ({ slug }));
}

export default function QuizPage({ params }: { params: { slug: string } }) {
  const quiz = getQuizBySlug(params.slug);
  if (!quiz) notFound();

  return (
    <div className="page-enter pt-20 pb-20 bg-cream min-h-screen">
      <EscaleQuiz
        lang={quiz.lang}
        slug={params.slug}
        title={quiz.title}
        escaleNum={quiz.escale}
        color={quiz.color}
        questions={quiz.questions}
        nextEscaleSlug={quiz.nextEscaleSlug}
      />
    </div>
  );
}
