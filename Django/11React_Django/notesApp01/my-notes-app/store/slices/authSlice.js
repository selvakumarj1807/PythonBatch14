import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const body = {
        user_name: payload.username || payload.user_name,
        user_email: payload.user_email,
        password: payload.password,
      };
      const res = await api.post("/auth/register/", body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login/", credentials);
      const data = res.data || {};

      const access =
        data.access || data.token || data.access_token || data?.tokens?.access;
      const refresh =
        data.refresh || data.refresh_token || data?.tokens?.refresh;

      const userObj = data.user || data.user_data || data.profile || data;
      const username =
        userObj?.username ||
        userObj?.user_name ||
        userObj?.name ||
        userObj?.user_email ||
        "";

      if (typeof window !== "undefined") {
        if (access) localStorage.setItem("accessToken", access);
        if (refresh) localStorage.setItem("refreshToken", refresh);
        if (username) localStorage.setItem("username", username);
      }

      return { access, refresh, username };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/profile/");
      const data = res.data || {};
      const username =
        data.username || data.user_name || data.name || data.email || "";
      if (typeof window !== "undefined" && username)
        localStorage.setItem("username", username);
      return { username };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  username:
    typeof window !== "undefined" ? localStorage.getItem("username") || "" : "",
  loading: false,
  error: null,
  registerSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.username = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
      }
    },
    clearError(state) {
      state.error = null;
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.username = action.payload.username;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.username = action.payload.username;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        console.warn("Profile fetch failed:", action.payload);
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
