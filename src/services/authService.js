import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

import { auth, googleProvider } from "../config/firebase-config";

const getAuthErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already in use. Please try logging in.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/invalid-credential":
      return "Invalid login credential";
    case "auth/weak-password":
      return "Password is too weak. Minimum 6 characters required.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export async function register({ email, password }) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result?.user) {
      const user = result.user;
      return { success: true, data: user };
    } else {
      return { success: false, error: "Something went wrong" };
    }
  } catch (error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
    const errorMessage = getAuthErrorMessage(error.code);
    return { success: false, error: errorMessage };
  }
}

export async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result?.user) {
      const user = result.user;
      try {
      } catch (error) {}
      return { success: true, data: user };
    } else {
      return { success: false, error: "something went wrong!" };
    }
  } catch (error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
    const errorMessage = getAuthErrorMessage(error.code);
    return { success: false, error: errorMessage };
  }
}

export async function login({ email, password }) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result?.user) {
      const user = result.user;
      return { success: true, data: user };
    } else {
      return { success: false, error: "Error Logging in" };
    }
  } catch (error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
    const errorMessage = getAuthErrorMessage(error.code);
    return { success: false, error: errorMessage };
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("Logout failed: " + error.message);
  }
}
