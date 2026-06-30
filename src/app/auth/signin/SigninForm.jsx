"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
} from "@heroui/react";

import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SigninForm({ redirectTo = "/" }) {
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleSignin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { error: authError } = await signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        return;
      }

      setSuccess("Signed in successfully! Redirecting...");

      setEmail("");
      setPassword("");

      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Google Sign-in ───────────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);
    try {
      const { error: authError } = await signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });

      if (authError) {
        setError(authError.message || "Google sign-in failed.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during Google sign-in.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Welcome back
          </h1>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSignin} className="flex flex-col gap-5">
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email Address
            </Label>

            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
              <At className="text-zinc-400 pointer-events-none" size={16} />

              <Input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />
            </InputGroup>
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </Label>

            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
              <ShieldKeyhole
                className="text-zinc-400 pointer-events-none"
                size={16}
              />

              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />

              <button
                type="button"
                onClick={toggleVisibility}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                aria-label="toggle password visibility"
              >
                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </InputGroup>
          </TextField>

          {/* Error */}
          {error && (
            <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
              <span className="font-semibold">Success:</span> {success}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold rounded-xl text-sm h-12"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Sign In
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-500 dark:text-zinc-500">OR</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl h-12 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-200 disabled:opacity-50 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.98 2.69 30.4 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.43 13.09 17.72 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.4c-.54 2.9-2.17 5.36-4.62 7.02l7.2 5.6C43.91 37.1 46.1 31.4 46.1 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.54 28.43A14.5 14.5 0 019.5 24c0-1.52.26-2.99.72-4.43l-7.98-6.2A24 24 0 000 24c0 3.84.92 7.45 2.56 10.68l7.98-6.25z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.14 15.91-5.8l-7.2-5.6c-2.01 1.35-4.6 2.1-8.71 2.1-6.28 0-11.57-3.59-13.46-8.93l-7.98 6.25C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            {isGoogleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            New to SkillSwap?{" "}
            <Link
              href={`/auth/signup?redirect=${encodeURIComponent(redirectTo)}`}
              className="font-medium text-blue-600 dark:text-blue-400"
            >
              Create an account
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}