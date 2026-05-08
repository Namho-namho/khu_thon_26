const ANCHORS = [
  { href: '#trait-card', label: '성향' },
  { href: '#portfolio', label: '포트폴리오' },
  { href: '#recommendations', label: '직업 추천' },
] as const;

export default function ResultPageNav() {
  return (
    <nav className="sticky top-[61px] z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
        {ANCHORS.map((a) => (
          <a
            key={a.href}
            href={a.href}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-violet-500"
          >
            {a.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
