import { useEffect, useState } from 'react';
import { getDomains } from '../util/requests';
import DomainItem from './Domain-Item';

export default function DomainsList() {
  const [domains, setDomains] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDomains();
      setDomains(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {!domains ? (
        <div>No domains purchased yet</div>
      ) : (
        domains.map((el) => {
          return <DomainItem key={el.Name} domain={el} />;
        })
      )}
    </>
  );
}
