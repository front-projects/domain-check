import { useState } from 'react';
import Button from './components/Button';
import { MagnifyingGlass } from 'react-loader-spinner';
import { checkDomain } from './util/requests';
import LockedInfo from './components/LockedInfo';
import FreeInfo from './components/FreeInfo';

function App() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  const [domain, setDomain] = useState('');

  const checkHandler = async (e) => {
    e.preventDefault();
    if (domain !== '') {
      setLoading(true);
      setStatus(false);
      const response = await checkDomain(domain);
      response ? setStatus('free') : setStatus('locked');
      setLoading(false);
    }
  };

  return (
    <main className="w-screen flex flex-col items-center pt-[25dvh]">
      <form className="flex gap-4 max-sm:flex-col" onSubmit={checkHandler}>
        <input
          onChange={(e) => {
            status && setStatus(false);
            setDomain(e.target.value);
          }}
          value={domain}
          placeholder="Enter your domain"
          className="w-[600px] max-sm:w-[90vw] text-center"
        />
        <Button type="submit">Check</Button>
      </form>
      {loading && (
        <div className="mt-10">
          <MagnifyingGlass glassColor="" color="yellow" />
        </div>
      )}
      {status == 'free' && <FreeInfo domain={domain} />}
      {status == 'locked' && <LockedInfo />}
    </main>
  );
}

export default App;
