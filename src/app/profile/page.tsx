"use client";
import { NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { pedido } from "@/app/content";
import ListPedido from "@/components/ListPedidosProfile";
import Image from "next/image";

interface UserMetadata {
  user_id: string;
  username: string;
  email: string;
  picture: string;
  phone_number: string;
  tipo_cargo: string;
}

const Profile: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [userData, setUserData] = useState<UserMetadata | null>(null);

  useEffect(() => {
    const metadata = async () => {
      if (user) {
        const response = await fetch(`/api/auth/management?userId=${user.sub}`);
        if (!response.ok) {
          console.error("Failed to fetch user metadata");
          return;
        }
        const user_data = await response.json();
        console.log("usuário", user_data);
        setUserData(user_data);
      }
    };

    metadata();
  }, [user, isLoading]);

  if (error) return <div>{error.message}</div>;

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Perfil do Usuário
      </h1>

      {isLoading && userData?.tipo_cargo === "" ? (
        <p className="text-gray-600">Carregando informações do usuário...</p>
      ) : (
        <div className="flex items-center space-x-4">

          <Image
            src="/perfil.jpeg"
            alt="Imagem de perfil"
            width={96}
            height={96}
            className="rounded-full border border-gray-200"
          />
          <div>
            <span className="bg-slate-200 text-xs p-0.5 rounded-sm">Id: {userData?.user_id}</span>
            <h2 className="text-xl font-semibold ">
              {userData?.username}
            </h2>
            <p>{userData?.email}</p>
            <p className="mt-1 text-sm font-bold">
              Tipo de Cadastro:
              <span className="capitalize font-normal"> {userData?.tipo_cargo}</span>
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Informações adicionais
        </h3>
        {userData?.tipo_cargo === "cliente" && (
          <div>
            {/* filtrar fk_id_cliente = userData?.user_id */}
            <h4 className="text-gray-600">Seus pedidos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pedido
                .filter((item) => item.fk_id_cliente === userData?.user_id)
                .map((item) => (
                  <ListPedido
                    key={item.id_pedido}
                    pedido={{
                      ...item,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
        {userData?.tipo_cargo === "admin" && (
          <div>
            <h4 className="text-gray-600">Todos os pedidos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pedido.map((item) => (
                <ListPedido
                  key={item.id_pedido}
                  pedido={{
                    ...item,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {userData?.tipo_cargo === "barman" && (
          <div>
            {/* filtrar fk_id_barman = userData?.user_id */}
            <h4 className="text-gray-600">Seus agendamentos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pedido
                .filter((item) => item.fk_id_barman === userData?.user_id)
                .map((item) => (
                  <ListPedido
                    key={item.id_pedido}
                    pedido={{
                      ...item,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
        {userData?.tipo_cargo === "entregador" && (
          <div>
            {/* filtrar fk_id_entregador = userData?.user_id */}
            <h4 className="text-gray-600">Seus agendamentos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pedido
                .filter((item) => item.fk_id_entregador === userData?.user_id)
                .map((item) => (
                  <ListPedido
                    key={item.id_pedido}
                    pedido={{
                      ...item,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withPageAuthRequired(Profile);
