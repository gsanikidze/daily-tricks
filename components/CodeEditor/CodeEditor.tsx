import React, { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import Select, { SingleValue } from 'react-select';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useDispatch } from 'react-redux';

import Button from '../Button';
import { addPost } from '../../store/modules/feed';
import Card from '../Card';
import Input from '../Input';
import { useAppSelector } from '../../store';

interface Option {
  value: string;
  label: string;
}

export default function CodeEditor() {
  const dispatch = useDispatch();
  const editorRef = useRef<any>(null);
  const [languages, setLanguages] = useState<Option[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Option>({ label: 'typescript', value: 'typescript' });
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const userId = useAppSelector((st) => st.user.profile.uid);
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
      .map((i) => ({ value: i.id, label: i.id })));
  };

  const changeLanguage = (option: SingleValue<Option>) => {
    if (option) {
      setSelectedLanguage(option);
    }
  };

  const onPublish = () => {
    dispatch(addPost({
      language: selectedLanguage.value,
      value: editorRef.current.getValue(),
      title,
      userId: userId || '',
    }));
    setIsEditorOpen(false);
    setTitle('');
  };

  const onTitleChange = (value: string) => {
    setTitle(value);
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4">
        {
          isEditorOpen ? <Input placeholder="Title" onChange={onTitleChange} /> : (
            <h4>
              Write Some Trick
            </h4>
          )
        }
        <div className="space-x-4 flex items-center">
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
          <Button
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            type={isEditorOpen ? 'default' : 'primary'}
          >
            { isEditorOpen ? <ChevronUp /> : <ChevronDown /> }
          </Button>
        </div>
      </div>
      <div className={`rounded-b-lg overflow-hidden ${isEditorOpen ? 'h-auto' : 'h-0'}`}>
        {
          isEditorOpen && (
            <Editor
              height="150px"
              language={selectedLanguage.value}
              defaultValue="// place your code hire"
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
