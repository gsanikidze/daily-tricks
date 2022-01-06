import React from 'react'
import Editor from '@monaco-editor/react'

export default function CodeEditor() {
  const code = `const a = 2;\nconst b = 3;\nconsole.log(b);\nlet b = 2;`

  return (
    <Editor
      height="300px"
      defaultLanguage="javascript"
      defaultValue={code}
      theme="vs-dark"
      options={{
        formatOnPaste: true,
        tabSize: 2,
        minimap: {
          enabled: false,
        }
      }}
    />
  )
}
