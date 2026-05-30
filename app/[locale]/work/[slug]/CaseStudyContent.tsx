import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

interface Props {
  slug: string;
  locale: string;
  description: string;
}

function CaseImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-12 -mx-6 md:-mx-16">
      <div className="relative w-full overflow-hidden rounded-sm bg-foreground/5">
        <Image
          src={src}
          alt={alt}
          width={1240}
          height={800}
          className="w-full h-auto"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted font-sans tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Metrics({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
      {children}
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-background p-6">
      <p className="font-display font-800 text-3xl md:text-4xl tracking-tight mb-1">{value}</p>
      <p className="text-xs text-muted font-sans leading-snug">{label}</p>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="not-prose my-10 border-l-2 border-accent pl-6 py-1">
      <div className="text-foreground font-sans text-lg leading-relaxed italic">{children}</div>
    </blockquote>
  );
}

function DecisionGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 grid md:grid-cols-2 gap-4">
      {children}
    </div>
  );
}

function Decision({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="not-prose border border-border p-6">
      <p className="text-xs text-muted font-sans uppercase tracking-widest mb-2">{number}</p>
      <h4 className="font-sans font-600 text-base mb-3">{title}</h4>
      <div className="text-sm text-muted font-sans leading-relaxed">{children}</div>
    </div>
  );
}

const components = {
  CaseImage,
  Metrics,
  Metric,
  Callout,
  Decision,
  DecisionGrid,
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-10 -mx-6 md:-mx-16">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={1240}
        height={800}
        className="w-full h-auto rounded-sm"
        unoptimized
      />
    </figure>
  ),
};

export default async function CaseStudyContent({ slug, locale, description }: Props) {
  const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.${locale}.mdx`);
  const fallbackPath = path.join(process.cwd(), 'content', 'projects', `${slug}.mdx`);

  let source = '';

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { content } = matter(raw);
    source = content;
  } else if (fs.existsSync(fallbackPath)) {
    const raw = fs.readFileSync(fallbackPath, 'utf-8');
    const { content } = matter(raw);
    source = content;
  } else {
    source = description;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-700 prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted prose-p:leading-relaxed prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4 prose-strong:text-foreground prose-li:text-muted prose-li:leading-relaxed prose-hr:border-border">
        <MDXRemote source={source} components={components as never} />
      </div>
    </div>
  );
}
