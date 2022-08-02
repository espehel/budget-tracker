import React, { FC } from 'react';
import { useAsync } from 'react-use';
import { getPosts } from './firestore-api';
import PostEntries from './PostEntries';
import { TrumfTransaction } from './utils/trumf-visa-parser';

interface Props {
  transactions: Array<TrumfTransaction>;
}

const Budget: FC<Props> = ({ transactions }) => {
  const { value } = useAsync(getPosts, []);
  return (
    <section>
      <h2>Budget</h2>
      <div>
        {value?.map((post) => (
          <div key={post.name}>
            <h3>{post.name}</h3>
            <PostEntries
              entries={transactions
                .filter(({ description }) =>
                  post.patterns.some((pattern: string) => description.includes(pattern))
                )
                .map(({ description, amountNOK }) => `${description} - ${amountNOK}`)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Budget;
