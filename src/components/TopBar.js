import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";

export default function TopBar() {
  return (
    <div
      className=" flex
              justify-between
               px-28
               py-2
         
               bg-black
               text-white
              shadow-xl
           "
    >
      <div className="flex ">
        <Link href="/" className="mr-8">
          Community
        </Link>
        <Link href="/" className="mr-8">
          Books
        </Link>
        <Link href="/">Popular</Link>
      </div>
      <div className="flex">
        <Link href="/login" className="mr-8">
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="mr-4 text-green-500"
          />
          Login
        </Link>

        <Link href="/register">
          <FontAwesomeIcon icon={faUser} className="mr-4 text-green-500" />
          Register
        </Link>
      </div>
    </div>
  );
}
