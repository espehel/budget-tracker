import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { readPdf } from './utils/pdf-reader';
import { parseTrumfVisa, TrumfTransaction } from './utils/trumf-visa-parser';
import { getPosts } from './firestore-api';
import Budget from './Budget';

const App: FC = () => {
  const [transactions, setTransactions] = useState<Array<TrumfTransaction>>([]);
  const handleFileOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      const content = await readPdf(file);
      setTransactions(parseTrumfVisa(content));
    }
  };

  useEffect(() => {
    getPosts().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <main>
      <h1>Budget Tracker</h1>
      <input type="file" onChange={handleFileOnChange} />
      <article>
        <Budget transactions={transactions} />
        <section>
          <h2>Transactions</h2>
          <ul>
            {transactions.map((trx) => (
              <li>{`${trx.description} - ${trx.amountNOK}`}</li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
};

export default App;
