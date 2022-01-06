import React, { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

export default function CodeEditor() {
  const code = 'const a = 2;\nconst b = 3;\nconsole.log(b);';
  const editorRef = useRef<any>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('typescript');

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    setLanguages(monaco.languages.getLanguages().map((i) => i.id));
  };

  const changeLanguage = (e: any) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div>
      <select name="languages" id="languages" onChange={changeLanguage} value={selectedLanguage}>
        {
          languages.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))
        }
      </select>
      <Editor
        height="250px"
        language={selectedLanguage}
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
  );
}
