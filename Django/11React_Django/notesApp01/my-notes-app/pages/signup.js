import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { registerUser } from "../store/slices/authSlice";
import Navbar from "../components/Navbar";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [data, setData] = useState({
    user_email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user_name: data.username,      
        user_email: data.user_email,
        password: data.password,
      };
      const res = await dispatch(registerUser(payload)).unwrap();
      alert("Registration successful! Please sign in.");
      router.push("/signin");
    } catch (err) {
      console.error("Register failed:", err);
      alert("Register failed: " + (err.detail || JSON.stringify(err)));
    }
  };


  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          fontFamily: "Georgia, serif",
        }}
      >
        <h2 style={{ color: "#5a4d36", marginBottom: "20px" }}>Sign Up</h2>
        <form
          onSubmit={submit}
          style={{
            background: "#f7f0e1",
            padding: "25px 35px",
            borderRadius: "12px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            minWidth: "300px",
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #c7b98b",
              outline: "none",
            }}
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            value={data.user_email}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #c7b98b",
              outline: "none",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #c7b98b",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#c7b98b",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
