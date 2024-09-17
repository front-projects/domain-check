import { FaCheck } from 'react-icons/fa';
import Button from './Button';

export default function FreeInfo({ domain }) {
  return (
    <>
      <div className="flex items-center gap-2 mt-10 text-green-600 text-[24px] px-10 text-center mb-4">
        <p>This domain is available for purchase</p>
        <div>
          <FaCheck />
        </div>
      </div>
      <Button>Buy {domain}</Button>
    </>
  );
}
