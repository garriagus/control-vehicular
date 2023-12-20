"use client";

import { signIn, signOut, useSession } from "next-auth/react";
//import { getServerSession } from "next-auth/next";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();
  //console.log(session?.user);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">        
        <p className="text-sky-600">{session.user.role}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }
  return (

    <li className="flex gap-4 ml-auto">
      <button className="hover:underline px-4 text-md text-emerald-900 hover:text-yellow-500 capitalize animate-pulse" onClick={() => signIn()}>
        Sign In
      </button>
    </li>
  );
};

export default SigninButton;
