import { useEffect, useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';

function App() {
  const [balance, setBalance] = useState(0);
  const [topUpAmt, setTopUpAmt] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [value, setValue] = useState('');

  const checkBal = async () => {
    const bal = await dbank_backend.checkBalance();
    return bal;
  };

  useEffect(() => {
    checkBal().then((bal) => {
      setBalance(bal);
      setValue(true)
    });
  }, []);

  function handleClear(t) {
    setValue(t)
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleClear(false);

    // read form data
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const inputAmt = parseFloat(formJson.topUp) || 0;
    const outputAmt = parseFloat(formJson.withdraw) || 0;
    if(inputAmt === 0 && outputAmt === 0) {
      handleClear(true);
    }

    if (inputAmt > 0) {
      dbank_backend.topUp(inputAmt).then((e) => {
        // setGreeting(greeting);
        checkBal().then((b) => {
          setBalance(b);
          setTopUpAmt(0)
          handleClear(true)
        });
      });
    }

    if (outputAmt > 0) {
      dbank_backend.withdraw(outputAmt).then((e) => {
        checkBal().then((b) => {
          setBalance(b)
          setWithdraw(0);
          handleClear(true)
        });
      });
    }
  }

  return (
    <main className="container">
      <img
        className="logo-dwallet"
        src="default.png"
        alt="DBank logo"
        width="100"
      />
      <br />
      <br />
      <h1>
        Current Balance: $
        <span id="value">{balance ? balance.toFixed(2) : ''}</span>
      </h1>
      <div className="divider"></div>

      <form action="#" onSubmit={handleSubmit}>
        <h2>Amount to Top Up</h2>
        <label htmlFor="input-amount">
          <input
            id="input-amount"
            type="number"
            onChange={(e) => setTopUpAmt(e.target.value)}
            step="0.01"
            min={0}
            name="topUp"
            value={topUpAmt}
          />
        </label>
        <h2>Amount to Withdraw</h2>
        <label htmlFor="withdrawal-amount">
          <input
            id="withdrawal-amount"
            type="number"
            onChange={(e) => setWithdraw(e.target.value)}
            name="withdraw"
            step="0.01"
            min={0}
            value={withdraw}
          />
        </label>

        <button id="submit-btn" type="submit" disabled={!value}>
          Finalise Transaction
        </button>
      </form>
    </main>
  );
}

export default App;
