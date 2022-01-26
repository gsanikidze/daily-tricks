import React, { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import Select, { SingleValue } from 'react-select';
import { ChevronDown, ChevronUp } from 'react-feather';

import Button from '../Button';
import Card from '../Card';
import Input from '../Input';
import { useAppSelector } from '../../store';
import { useAddTrickMutation, useEditTrickMutation } from '../../store/modules/api';
import useAuth from '../../hooks/useAuth';

interface Option {
  value: string;
  label: string;
}

interface Props {
  defaultOpen?: boolean;
  showOpenButton?: boolean;
  defaultTitle?: string;
  id?: string;
  code?: string;
  language?: string;
  afterPublish?: () => void;
}

export default function CodeEditor({
  defaultOpen = false,
  showOpenButton = true,
  defaultTitle,
  id,
  code,
  language,
  afterPublish,
}: Props) {
  const editorRef = useRef<any>(null);
  const [addTrick] = useAddTrickMutation();
  const [editTrick] = useEditTrickMutation();
  const [languages, setLanguages] = useState<Option[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Option>(
    language ? { label: language, value: language }
      : { label: 'typescript', value: 'typescript' },
  );
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(defaultOpen);
  const [title, setTitle] = useState(defaultTitle || '');
  const user = useAppSelector((st) => st.user);
  const { authWithGithub } = useAuth();
  const editorOptions: any = {
    formatOnPaste: true,
    tabSize: 2,
    minimap: {
      enabled: false,
    },
    lineNumbers: 'off',
    folding: false,
    padding: {
      top: 5,
      bottom: 5,
    },
    scrollBeyondLastLine: false,
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    setLanguages(monaco.languages.getLanguages()
      .map((i: { id: string }) => ({ value: i.id, label: i.id })));
  };

  const changeLanguage = (option: SingleValue<Option>) => {
    if (option) {
      setSelectedLanguage(option);
    }
  };

  const onPublish = () => {
    if (!user.isAuthorized) {
      authWithGithub();
      return;
    }

    if (!id) {
      addTrick({
        language: selectedLanguage.value,
        value: editorRef.current.getValue(),
        title,
        userId: user.profile.uid as string,
      });
    } else {
      editTrick({
        body: {
          language: selectedLanguage.value,
          value: editorRef.current.getValue(),
          title,
        },
        id,
      });
    }

    setIsEditorOpen(false);
    setTitle('');

    if (afterPublish) {
      afterPublish();
    }
  };

  const onTitleChange = (value: string) => {
    setTitle(value);
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4">
        {
          isEditorOpen ? <Input placeholder="Title" defaultValue={defaultTitle} onChange={onTitleChange} /> : (
            <h4>
              Write Some Trick
            </h4>
          )
        }
        <div className="space-x-4 flex items-center">
          {
            isEditorOpen && (
              <span className="md:flex space-x-4 hidden">
                <Select
                  instanceId="languages"
                  options={languages}
                  onChange={changeLanguage}
                  value={selectedLanguage}
                  className="w-40"
                />
                <Button onClick={onPublish}>
                  Publish
                </Button>
              </span>
            )
          }
          {
            showOpenButton && (
              <Button
                onClick={() => setIsEditorOpen(!isEditorOpen)}
                type={isEditorOpen ? 'default' : 'primary'}
              >
                {isEditorOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            )
          }
        </div>
      </div>
      {
        isEditorOpen && (
          <div className="mx-4 flex justify-between pb-4 md:hidden">
            <Select
              instanceId="languages"
              options={languages}
              onChange={changeLanguage}
              value={selectedLanguage}
              className="w-40"
            />
            <Button onClick={onPublish}>
              Publish
            </Button>
          </div>
        )
      }
      <div className={`rounded-b-lg overflow-hidden ${isEditorOpen ? 'h-auto' : 'h-0'}`}>
        {
          isEditorOpen && (
            <Editor
              height="150px"
              language={selectedLanguage.value}
              defaultValue={code || '// place your code hire'}
              theme="vs-dark"
              onMount={handleEditorDidMount}
              loading={<div className="w-full h-full dark:bg-gray-900" />}
              options={editorOptions}
            />
          )
        }
      </div>
    </Card>
  );
}

CodeEditor.defaultProps = {
  defaultOpen: false,
  showOpenButton: true,
  defaultTitle: null,
  id: null,
  code: null,
  language: null,
  afterPublish: null,
};
