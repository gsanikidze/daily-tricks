import React, { useState } from 'react';
import { Copy, Edit } from 'react-feather';
import { useDispatch } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015';

import { displayAlert } from '../../store/modules/layout';
import CodeEditor from '../CodeEditor';
import Modal from '../Modal';

interface Props {
  canEdit: boolean;
  children: string;
  language: string;
  title: string;
  className?: string;
}

export default function CodeBlock({
  children, language, className, canEdit, title,
}: Props) {
  const dispatch = useDispatch();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(children);
    dispatch(displayAlert({
      title: 'Code copied on clipboard',
      type: 'success',
    }));
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <span className="absolute right-4 top-3 flex space-x-4">
          <Copy
            color="white"
            size={16}
            className="cursor-pointer"
            onClick={copyToClipboard}
          />
          {
          canEdit && (
            <Edit
              color="white"
              size={16}
              className="cursor-pointer"
              onClick={() => setIsEditorOpen(true)}
            />
          )
        }
        </span>
        <SyntaxHighlighter language={language} style={vs2015}>
          { children }
        </SyntaxHighlighter>
      </div>
      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      >
        <CodeEditor
          defaultOpen
          showOpenButton={false}
          defaultTitle={title}
          code={children}
          language={language}
        />
      </Modal>
    </>
  );
}

CodeBlock.defaultProps = {
  className: '',
};
