"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isLoading } = useUser();

  return (
    <header className="bg-[#0b0b0a] text-coffe">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Café no Ponto!</span>
            <Image
              src="/cafe_no_ponto_logo.jpeg"
              alt="Café no Ponto!"
              width={200}
              height={112.5}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6 text-coffe" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a
            href="/#cardapio"
            className="text-sm font-semibold leading-6 transition-all"
          >
            Cardapio
          </a>
          <a href="#" className="text-sm font-semibold leading-6 ">
            Agendamentos
          </a>
          <a href="#" className="text-sm font-semibold leading-6 ">
            Sobre nós
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isLoading && !user && (
            <div className="relative">
              <a
                href="/api/auth/login"
                className="text-sm font-semibold leading-6"
              >
                Login
              </a>
            </div>
          )}
          {user && user.picture && <ProfileMenu user={user} />}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto text-coffe bg-[#0b0b0a] border-white border px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Café no Ponto!</span>
              <Image
                src="/cafe_no_ponto_logo.jpeg"
                alt="Café no ponto"
                width={150}
                height={84}
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6 text-coffe" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/#cardapio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-coffe hover:text-white"
                >
                  Cardapio
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-coffe hover:text-white"
                >
                  Agendamentos
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-coffe hover:text-white"
                >
                  Sobre nós
                </a>
              </div>
              <div className="py-6">
                {!isLoading && !user && (
                  <div className="relative">
                    <a
                      href="/api/auth/login"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-coffe hover:text-white"
                    >
                      Login
                    </a>
                  </div>
                )}
                {user && user.picture && <ProfileMenu user={user} />}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
