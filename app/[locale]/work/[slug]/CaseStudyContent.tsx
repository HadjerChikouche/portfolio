import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';

interface Props {
  slug: string;
  locale: string;
  description: string;
}

function CaseImage({ src, alt, caption, crop }: { src: string; alt: string; caption?: string; crop?: string }) {
  return (
    <figure className="my-12 -mx-6 sm:-mx-8 lg:-mx-12">
      <div
        className="relative w-full overflow-hidden rounded-sm bg-foreground/5"
        style={crop ? { aspectRatio: crop } : undefined}
      >
        {crop ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            unoptimized
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1240}
            height={800}
            className="w-full h-auto"
            unoptimized
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted font-sans tracking-wide">
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
    <blockquote className="not-prose my-10 border-l-2 border-accent pl-6 py-4">
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
      <p className="text-xs text-accent font-sans uppercase tracking-widest mb-2">{number}</p>
      <h4 className="font-sans font-600 text-base mb-3">{title}</h4>
      <div className="text-sm text-muted font-sans leading-relaxed">{children}</div>
    </div>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-10 overflow-x-auto border border-border">
      <table className="w-full text-sm font-sans border-collapse">{children}</table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs uppercase tracking-widest text-muted border-b border-border font-600 bg-foreground/[0.03]">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-foreground/80 border-b border-border align-top leading-relaxed">
      {children}
    </td>
  );
}

function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-foreground/[0.02] transition-colors">{children}</tr>;
}

const components = {
  CaseImage,
  Metrics,
  Metric,
  Callout,
  Decision,
  DecisionGrid,
  table: Table,
  th: Th,
  td: Td,
  tr: Tr,
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-10 -mx-6 sm:-mx-8 lg:-mx-12">
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
    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-700 prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted prose-p:leading-relaxed prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-6 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-strong:text-foreground prose-li:text-muted prose-li:leading-relaxed prose-hr:border-border">
        <MDXRemote
          source={source}
          components={components as never}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </div>
  );
}
