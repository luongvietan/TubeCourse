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
        "prose prose-zinc dark:prose-invert max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:border-border",
        "prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3",
        "prose-p:leading-7 prose-p:mb-4",
        "prose-ul:my-6 prose-ul:ml-6 prose-ul:list-disc [&>ul>li]:marker:text-accent",
        "prose-ol:my-6 prose-ol:ml-6 prose-ol:list-decimal [&>ol>li]:marker:font-medium",
        "prose-li:my-2",
        "prose-strong:font-semibold prose-strong:text-foreground",
        "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
        "prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic",
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
