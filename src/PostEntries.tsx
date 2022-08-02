import React, { FC } from 'react';

interface Props {
  entries: Array<string>;
}

const PostEntries: FC<Props> = ({ entries }) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li>{entry}</li>
      ))}
    </ul>
  );
};

export default PostEntries;
