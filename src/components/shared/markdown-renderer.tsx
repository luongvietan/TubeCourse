import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = memo(({ content, className }: MarkdownRendererProps) => {
  return (
    <article
      className={cn(
        "prose prose-stone max-w-none text-text-main/90 font-jp leading-relaxed",
        "prose-headings:font-medium prose-headings:tracking-tight prose-headings:font-jp prose-headings:italic",
        "prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:pb-4 prose-h2:border-text-main/10",
        "prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6",
        "prose-p:leading-loose prose-p:mb-8 text-text-sub group-hover:text-text-main transition-colors duration-700",
        "prose-ul:my-8 prose-ul:ml-8 prose-ul:list-disc [&>ul>li]:marker:text-text-main/20",
        "prose-ol:my-8 prose-ol:ml-8 prose-ol:list-decimal [&>ol>li]:marker:font-extrabold [&>ol>li]:marker:text-text-main/40",
        "prose-li:my-4 prose-li:pl-2",
        "prose-strong:font-bold prose-strong:text-text-main",
        "prose-blockquote:border-l-[3px] prose-blockquote:border-text-main/10 prose-blockquote:pl-10 prose-blockquote:italic prose-blockquote:bg-text-main/5 prose-blockquote:py-8 prose-blockquote:rounded-r-3xl prose-blockquote:my-12",
        "prose-code:bg-text-main/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:text-text-main prose-code:before:content-none prose-code:after:content-none",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

export default MarkdownRenderer;
