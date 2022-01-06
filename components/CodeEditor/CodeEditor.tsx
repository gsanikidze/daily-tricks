import React, { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import Select, { SingleValue } from 'react-select';

import Button from '../Button';

interface Option {
  value: string;
  label: string;
}

export default function CodeEditor() {
  const code = 'const a = 2;\nconst b = 3;\nconsole.log(b);';
  const editorRef = useRef<any>(null);
  const [languages, setLanguages] = useState<Option[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Option>({ label: 'typescript', value: 'typescript' });

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

  return (
    <section className="mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
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
          <Button>
            Publish
          </Button>
        </div>
      </div>
      <div className="rounded-b-lg overflow-hidden">
        <Editor
          height="250px"
          language={selectedLanguage.value}
          defaultValue={code}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          loading={<div className="w-full h-full bg-indigo-200" />}
          options={{
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
          }}
        />
      </div>
    </section>
  );
}
