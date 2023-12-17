"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      {" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          if (type === "login") {
            signIn("credentials", {
              redirect: false,
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
              // @ts-ignore
            }).then(({ error }) => {
              if (error) {
                setLoading(false);
                toast.error(error);
              } else {
                router.refresh();
                router.push("/protected");
              }
            });
          } else {
            fetch("/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
              }),
            }).then(async (res) => {
              setLoading(false);
              if (res.status === 200) {
                toast.success("Account created! Redirecting to login...");
                setTimeout(() => {
                  router.push("/login");
                }, 2000);
              } else {
                const { error } = await res.json();
                toast.error(error);
              }
            });
          }
        }}
        className="space-y-4 md:space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          ></input>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
        </div>

        <button
          disabled={loading}
          className={`${
            loading
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
          )}
        </button>
        {type === "login" ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <p className="text-center text-sm text-white">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-white">
                Sign up
              </Link>{" "}
              for free.
            </p>
          </>
        ) : (
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-white">
              Sign in
            </Link>{" "}
            instead.
          </p>
        )}
      </form>
    </>
  );
}
