import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginUser, fetchProfile } from "../store/slices/authSlice";
import Navbar from "../components/Navbar";

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ user_email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();

      await dispatch(fetchProfile());

      alert("Login successful!");
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: " + (err.detail || JSON.stringify(err)));
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="auth-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          fontFamily: "Georgia, serif",
        }}
      >
        <h2 style={{ color: "#5a4d36", marginBottom: "20px" }}>Sign In</h2>
        <form
          onSubmit={handleSubmit}
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
            type="email"
            name="user_email"
            placeholder="Email"
            value={form.user_email}
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
            value={form.password}
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
            disabled={loading}
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {typeof error === "string"
                ? error
                : JSON.stringify(error, null, 2)}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
