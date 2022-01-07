import React from 'react';
import { Copy } from 'react-feather';
import SyntaxHighlighter from 'react-syntax-highlighter';
import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015';

interface Props {
  children: string;
  language: string;
  className?: string;
}

export default function CodeBlock({ children, language, className }: Props) {
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(children);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        className="absolute right-4 top-4 cursor-pointer"
        onClick={copyToClipboard}
      >
        <Copy color="white" size={16} />
      </button>
      <SyntaxHighlighter language={language} style={vs2015}>
        { children }
      </SyntaxHighlighter>
    </div>
  );
}

CodeBlock.defaultProps = {
  className: '',
};
