import React from 'react';
import { useAppSelector } from '../../store';

import { Trick } from '../../store/modules/api';
import Card from '../Card';
import CodeBlock from '../CodeBlock';
import Tag from '../Tag';
import UserAvatar from '../UserAvatar';

interface Props {
  trick: Trick;
  bookmarks: string[];
}

export default function TrickCard({ trick, bookmarks }: Props) {
  const user = useAppSelector((st) => st.user);

  return (
    <Card
      key={trick.id}
      className="mt-4 overflow-hidden"
      title={trick.title}
      addonBefore={(
        <div className="flex justify-between items-center">
          <UserAvatar
            name={trick.user.displayName || trick.user.email || ''}
            alt={trick.user.displayName || trick.user.email || ''}
            photoURL={trick.user.photoURL}
          />
          <div className="flex items-center space-x-4">
            <code className="text-sm">
              {new Date(trick.createdAt).toLocaleDateString()}
            </code>
            <Tag>
              {trick.language}
            </Tag>
          </div>
        </div>
                )}
    >
      <CodeBlock
        key={trick.id}
        id={trick.id}
        language={trick.language}
        canEdit={user.profile.uid === trick.user.uid}
        canDelete={user.isAuthorized && trick.user.uid === user.profile.uid}
        title={trick.title}
        defaultBookmarked={bookmarks.includes(trick.id)}
      >
        { trick.value }
      </CodeBlock>
    </Card>
  );
}
