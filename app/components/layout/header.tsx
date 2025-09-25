"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/app/components/ui/button";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-amber-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Bella Vista
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/menu" className="hover:text-amber-200">
              Menu
            </Link>
            <Link href="/reservations" className="hover:text-amber-200">
              Reservations
            </Link>

            {session ? (
              <>
                <span>Hi, {session.user?.name || session.user?.email}</span>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-amber-900"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" className="hover:text-amber-200">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
