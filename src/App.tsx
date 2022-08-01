import React, { ChangeEvent, FC, useState } from "react";
import { readPdf } from "./utils/pdf-reader";
import { parseTrumfVisa, TrumfTransaction } from "./utils/trumf-visa-parser";

const App: FC = () => {
  const [transactions, setTransactions] = useState<Array<TrumfTransaction>>([]);
  const handleFileOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      const content = await readPdf(file);
      setTransactions(parseTrumfVisa(content));
    }
  };

  return (
    <main>
      <h1>Budget Tracker</h1>
      <input type="file" onChange={handleFileOnChange} />
      <article>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((trx) => (
            <li>{`${trx.description} - ${trx.amountNOK}`}</li>
          ))}
        </ul>
      </article>
    </main>
  );
};

export default App;
