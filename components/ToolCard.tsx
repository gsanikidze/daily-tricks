import React from 'react';
import { ExternalLink } from 'react-feather';

import Card from './Card';
import Tag from './Tag';

interface Props {
  name: string;
  description: string;
  tags: string[];
  categories: string[];
  homepageUrl: string;
  imageSrc: string;
}

export default function ToolCard({
  name, description, tags, categories, homepageUrl, imageSrc,
}: Props) {
  return (
    <Card
      title={name}
      avatar={{
        src: imageSrc,
        alt: `${name}.png`,
      }}
      addonBefore={(
        <div className="flex justify-between items-center">
          <div className="space-x-4">
            {
              categories.map((i) => <Tag key={i}>{i}</Tag>)
            }
          </div>
          <div className="flex space-x-2">
            {
              tags.map((i) => <Tag flat key={i}>{`#${i}`}</Tag>)
            }
          </div>
        </div>
  )}
      addonAfterTitle={(
        <div>
          <a href={homepageUrl} target="_blank" rel="noreferrer">
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
        { description }
      </p>
    </Card>
  );
}
