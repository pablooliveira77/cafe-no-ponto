import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { UserProfile } from "@auth0/nextjs-auth0/client";

interface ProfileMenuProps {
  user: UserProfile;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user }) => (
  <Menu as="div" className="relative ml-3">
    <div>
      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <Image
          src="/perfil.jpeg"
          alt="Imagem de perfil"
          width={96}
          height={96}
          className="h-8 w-8 rounded-full"
        />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 px-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu>
          <p className="text-slate-400 text-sm">
          {user.email}

          </p>
        </Menu>
        <Menu.Item>
          {({ active }) => (
            <a
              href="/profile"
              className={`block px-4 py-2 text-sm text-gray-700 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Perfil
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="/api/auth/logout"
              className={`block px-4 py-2 text-sm text-gray-700 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              Sair
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default ProfileMenu;
