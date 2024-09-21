import { FaCheck } from 'react-icons/fa';
import Button from './Button';
import { useState } from 'react';
import Modal from './Modal';
import { buyDomain } from '../util/requests';

export default function FreeInfo({ domain, onList }) {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState('question');

  const submitHandler = async () => {
    setStatus('loading');
    const response = await buyDomain();
    if (response) {
      setStatus('success');
    } else {
      setStatus('failed');
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-10 text-green-600 text-[24px] px-10 text-center mb-4">
        <p>This domain is available for purchase</p>
        <div>
          <FaCheck />
        </div>
      </div>
      <Button onClick={() => setModal(true)}>Buy {domain}</Button>
      <Modal
        isOpen={modal}
        onClose={() => {
          setStatus('question');
          setModal(false);
        }}
      >
        <div className="py-6">
          {(status == 'question' || status == 'loading') && (
            <div>Do you really want to buy a domain - {domain} ?</div>
          )}
          {status == 'success' && (
            <div>You have successfully purchased a domain - {domain}</div>
          )}
          {status == 'failed' && (
            <div>There was an error, please try again later</div>
          )}
        </div>
        {status == 'question' && (
          <Button onClick={() => submitHandler()}>Yes</Button>
        )}
        {status == 'loading' && <Button disabled>Buying..</Button>}
        {status == 'failed' && (
          <Button
            onClick={() => {
              setStatus('question');
              setModal(false);
            }}
          >
            Close
          </Button>
        )}
        {status == 'success' && (
          <Button onClick={onList}>Show my domains</Button>
        )}
      </Modal>
    </>
  );
}
