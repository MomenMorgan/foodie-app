import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/images/foodie-logo-zip-file/png/logo-no-background.png";

export default function Header() {
  return (
    <div>
      <header>
        <nav>
          <div
            className=" flex
              justify-between
               p-4
         
               bg-black
               text-white
           "
          >
            <div className="flex">
              <Link href="/" className="mr-4">
                Community
              </Link>
              <Link href="/" className="mr-4">
                Books
              </Link>
              <Link href="/">Popular</Link>
            </div>
            <div className="flex">
              <Link href="/login" className="mr-4">
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="mr-4 text-green-500"
                />
                Login
              </Link>

              <Link href="/register">
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-4 text-green-500"
                />
                Register
              </Link>
            </div>
          </div>
          <div className="w-24">
              <img src={logo} alt="logo" />
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
