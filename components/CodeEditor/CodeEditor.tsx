import React, { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import Select, { SingleValue } from 'react-select';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useDispatch } from 'react-redux';

import Button from '../Button';
import { addPost } from '../../store/modules/feed';

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
    }));
    setIsEditorOpen(false);
  };

  return (
    <section className="bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center p-4">
        <h3>
          Write Some Trick
        </h3>
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
    </section>
  );
}
