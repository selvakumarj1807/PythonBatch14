import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useEffect, useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const { accessToken, username } = useSelector((s) => s.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) {
    return (
      <nav className="navbar">
        <h2>Keep Notes</h2>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <h2>Keep Notes</h2>
      <div className="links">
        <Link href="/">Home</Link>
        {accessToken ? (
          <>
            <span style={{ marginLeft: 12, marginRight: 8 }}>👋 {username || "User"}</span>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/signin">Login</Link>
            <Link href="/signup">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
