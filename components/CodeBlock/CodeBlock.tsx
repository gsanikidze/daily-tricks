import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015';

interface Props {
  children: string;
  language: string;
  className?: string;
}

export default function CodeBlock({ children, language, className }: Props) {
  return (
    <SyntaxHighlighter className={className} language={language} style={vs2015}>
      { children }
    </SyntaxHighlighter>
  );
}

CodeBlock.defaultProps = {
  className: '',
};
