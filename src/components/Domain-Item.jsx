import { useState } from 'react';
import { convertEpochToDate } from '../util/formatTime';
import Button from './Button';
import Modal from './Modal';
import { updateInfo } from '../util/requests';

export default function DomainItem({ domain }) {
  const [info, setInfo] = useState();
  const [isEditing, setIsEditing] = useState();

  const [started, setStarted] = useState({
    sub1: domain.NameServerSettings.SubDomains[0].Subhost,
    sub2: domain.NameServerSettings.SubDomains[1].Subhost,
    value1: domain.NameServerSettings.SubDomains[0].Value,
    value2: domain.NameServerSettings.SubDomains[1].Value,
    main1: domain.NameServerSettings.SubDomains[0].Value,
    main2: domain.NameServerSettings.MainDomains[1].Value,
  });
  const [updated, setUpdated] = useState(started);
  const [isLoading, setIsLoading] = useState();

  const submitHandler = async () => {
    setIsLoading(true);
    const response = await updateInfo(updated, domain.Name);
    if (response) {
      setStarted(updated);
    } else {
      alert('Something went wrong');
    }
    setIsLoading(false);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setUpdated(started);
    setIsEditing(false);
  };

  return (
    <>
      <div className="border-2 p-3 px-10 rounded-[24px] flex gap-4 items-center text-xl cursor-pointer max-w-[95vw] max-sm:flex-col">
        <div>
          <span className="text-gray-400 text-lg">Name: </span> {domain.Name}
        </div>
        <div>
          <span className="text-gray-400 text-lg">Registered At: </span>
          {convertEpochToDate(domain.Registration)}
        </div>
        <div>
          <span className="text-gray-400 text-lg ">Expiration: </span>
          {convertEpochToDate(domain.Expiration)}
        </div>
        <Button onClick={() => setInfo(true)}>Show more</Button>
      </div>
      <Modal isOpen={info} onClose={() => setInfo(false)}>
        <div className="min-w-[400px] flex flex-col items-center text-xl max-sm:min-w-[90vw] max-h-[100dvh] overflow-auto py-10">
          <h1 className="font-bold w-full border-b-2 p-2 text-center">
            {domain.Name}
          </h1>
          <h2 className="mt-4">Main domains:</h2>
          <div>
            {/* {domain.NameServerSettings.MainDomains[0].RecordType} -{' '} */}
            {/* {isEditing ? }
            {domain.NameServerSettings.MainDomains[0].Value} */}
            {isEditing ? (
              <input
                className="max-w-[200px] m-4"
                value={updated.main1}
                onChange={(e) =>
                  setUpdated({ ...updated, main1: e.target.value })
                }
              />
            ) : (
              started.main1
            )}
          </div>
          <div>
            {/* {domain.NameServerSettings.MainDomains[1].RecordType} -{' '} */}
            {/* {domain.NameServerSettings.MainDomains[1].Value} */}
            {isEditing ? (
              <input
                className="max-w-[200px] m-4"
                value={updated.main2}
                onChange={(e) =>
                  setUpdated({ ...updated, main2: e.target.value })
                }
              />
            ) : (
              started.main2
            )}
          </div>
          <h2 className="mt-4">Sub domains:</h2>
          <div>
            {isEditing ? (
              <input
                className="max-w-[200px] m-4"
                value={updated.sub1}
                onChange={(e) =>
                  setUpdated({ ...updated, sub1: e.target.value })
                }
              />
            ) : (
              started.sub1
            )}
            {' - '}

            {isEditing ? (
              <input
                className="max-w-[200px] m-4"
                value={updated.value1}
                onChange={(e) =>
                  setUpdated({ ...updated, value1: e.target.value })
                }
              />
            ) : (
              started.value1
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                className="max-w-[200px] m-4"
                value={updated.sub2}
                onChange={(e) =>
                  setUpdated({ ...updated, sub2: e.target.value })
                }
              />
            ) : (
              started.sub2
            )}
            {' - '}

            {isEditing ? (
              <input
                className="max-w-[200px] m-4"
                value={updated.value2}
                onChange={(e) =>
                  setUpdated({ ...updated, value2: e.target.value })
                }
              />
            ) : (
              started.value2
            )}
          </div>
          <div className="flex mt-4 gap-2">
            {isEditing ? (
              <Button onClick={submitHandler} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}

            {isEditing ? (
              <button
                className="border-2 rounded-[24px] p-2 px-6"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            ) : (
              <button
                className="border-2 rounded-[24px] p-2 px-6"
                onClick={() => setInfo(false)}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
