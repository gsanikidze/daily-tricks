import React, { useCallback, useState } from 'react';
import {
  Copy, Edit, Star, Trash,
} from 'react-feather';
import { useDispatch } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015';
import { useAppSelector } from '../../store';

import { useDeleteTrickMutation, useBookmarkTrickMutation, useDeleteBookmarkTrickMutation } from '../../store/modules/api';
import { displayAlert } from '../../store/modules/layout';
import CodeEditor from '../CodeEditor';
import Modal from '../Modal';

interface Props {
  canEdit: boolean;
  children: string;
  language: string;
  title: string;
  id: string;
  className?: string;
  canDelete: boolean;
  defaultBookmarked: boolean;
}

export default function CodeBlock({
  children, language, className, canEdit, title, id, canDelete, defaultBookmarked,
}: Props) {
  const dispatch = useDispatch();
  const isAuthorized = useAppSelector((st) => st.user.isAuthorized);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [deleteTrick] = useDeleteTrickMutation();
  const [bookmarkTrick] = useBookmarkTrickMutation();
  const [deleteBookmarkTrick] = useDeleteBookmarkTrickMutation();
  const [isBookmarked, setIsBookmarked] = useState(defaultBookmarked);

  const onDelete = useCallback(() => {
    deleteTrick(id);
  }, [deleteTrick, id]);

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(children);
    dispatch(displayAlert({
      title: 'Code copied on clipboard',
      type: 'success',
    }));
  }, [children, dispatch]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      deleteBookmarkTrick(id);
    } else {
      bookmarkTrick(id);
    }

    setIsBookmarked((st) => !st);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <span className="absolute right-4 top-3 flex space-x-4">
          {
            canDelete && (
              <Trash
                color="white"
                size={16}
                className="cursor-pointer"
                onClick={onDelete}
              />
            )
          }
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
          {
            isAuthorized && (
              <Star
                color="white"
                fill={isBookmarked ? 'white' : 'transparent'}
                size={16}
                className="cursor-pointer"
                onClick={toggleBookmark}
              />
            )
          }
          <Copy
            color="white"
            size={16}
            className="cursor-pointer"
            onClick={copyToClipboard}
          />
        </span>
        <SyntaxHighlighter language={language} style={vs2015}>
          {children}
        </SyntaxHighlighter>
      </div>
      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      >
        <CodeEditor
          id={id}
          defaultOpen
          showOpenButton={false}
          defaultTitle={title}
          code={children}
          language={language}
          afterPublish={() => setIsEditorOpen(false)}
        />
      </Modal>
    </>
  );
}

CodeBlock.defaultProps = {
  className: '',
};
