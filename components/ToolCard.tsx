import React from 'react';
import { ExternalLink } from 'react-feather';

import Card from './Card';
import Tag from './Tag';

export default function ToolCard() {
  return (
    <Card
      title="VSCode"
      avatar={{
        src: 'https://storage.googleapis.com/dt-tool-avatars/vscode.png',
        alt: 'vscode.png',
      }}
      addonBefore={(
        <div className="flex justify-between items-center">
          <div>
            <Tag>Editors</Tag>
          </div>
          <div className="flex space-x-2">
            <Tag flat>#Editor</Tag>
            <Tag flat>#TypeScript</Tag>
            <Tag flat>#Tool</Tag>
          </div>
        </div>
  )}
      addonAfterTitle={(
        <div>
          <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">
            <ExternalLink
              color="white"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </a>
        </div>
  )}
    >
      <p className="px-4 pb-4">
        Visual Studio Code is a lightweight but powerful
        source code editor which runs on your desktop
        and is available for Windows, macOS and Linux.
        It comes with built-in support for JavaScript,
        TypeScript and Node.js and has a rich ecosystem
        of extensions for other languages
        (such as C++, C#, Java, Python, PHP, Go) and
        runtimes (such as .NET and Unity).
      </p>
    </Card>
  );
}
