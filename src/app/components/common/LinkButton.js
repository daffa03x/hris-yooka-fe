import Link from 'next/link';
import { useState } from 'react';
const LinkButton = ({ link, title, classNameLink, classNameLoading }) => {
  const [LinkButton, setLinkButton] = useState(false);
  return (
    <>
        {LinkButton ? (
            <button
            type="submit"
            className={`w-24 xl:mr-3 align-top loading relative unique-loading-btn ${classNameLoading}`}
            disabled
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <span className="text" style={{ visibility: "hidden" }}>
                    Loading
                </span>
                <div className="submit"></div>
            </button>
        ) : (
            <Link href={link} className={`xl:mr-3 ${classNameLink}`} onClick={() => setLinkButton(true)}>
                {title}
            </Link>
        )}
    </>
  )
}

export default LinkButton