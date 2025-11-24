import Link from 'next/link';
import { useState } from 'react';
import { FaCircleNotch, FaPenToSquare } from 'react-icons/fa6';
const EditButton = ({ link }) => {
  const [EditButton, setEditButton] = useState(false);
  return (
    <>
        {EditButton ? (
            <div className="div-loading flex items-center mr-3">
                <style>
                    {`
                    .spin {
                        display: inline;
                        animation: spin 1s linear infinite;
                    }
                    .div-loading {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    `}
                </style>
                <FaCircleNotch className="spin" />
            </div>
        ) : (
            <Link href={link} className="flex items-center mr-3" onClick={() => setEditButton(true)}>
                <FaPenToSquare className="w-4 h-4 mr-1" /> Edit
            </Link>
        )}
    </>
  )
}

export default EditButton