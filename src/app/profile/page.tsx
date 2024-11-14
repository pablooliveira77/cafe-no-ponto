"use client";
import { NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import ListPedido from "@/components/ListPedidosProfile";
import Image from "next/image";
import UtilsSwiss from "@/utils/func/swiss";

interface UserMetadata {
  id_pessoa: string;
  nome: string;
  email: string;
  numero: string;
  tipo: string;
}

interface Pedido {
  id_pedido: number;
  data_pedido: string;
  valor_pedido: number;
  endereco_entrega: string;
  data_semana: string;
  horario_agendamento: string[];
  data_limite: string;
  fk_id_cliente: string;
  itens_catalogo: [
    {
      id_catalogo: number;
      nome: string;
      tipo: string;
      tamanho: string;
      imagem: string;
    },
    {
      id_catalogo: number;
      nome: string;
      tipo: string;
      tamanho: string;
      imagem: string;
    }
  ];
}

const Profile: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [userData, setUserData] = useState<UserMetadata | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  
  useEffect(() => {
    const metadata = async () => {
      const { getData, getSemana } = new UtilsSwiss();
      if (user) {
        const response = await fetch(`/api/auth/management?userId=${user.sub}`);
        if (!response.ok) {
          console.error("Failed to fetch user metadata");
          return;
        }
        const user_data = await response.json();
        console.log("usuário", user_data);

        setUserData({
          id_pessoa: user_data.user_id,
          nome: user_data.username,
          email: user_data.email,
          numero: user_data.phone_number,
          tipo: user_data.tipo_cargo,
        });

        const responsePedidos = await fetch(`/api/pedido`);
        if (!responsePedidos.ok) {
          console.error("Failed to fetch pedidos");
          return;
        }
        const pedido_json = await responsePedidos.json();
        console.log("pedidos", pedido_json);
        const pedidosTransformados = await Promise.all(
          pedido_json.map(async (pedido: { data_pedido: string; data_semana: string[]; data_limite: string }) => ({
            ...pedido,
            data_pedido: await getData(pedido.data_pedido),
            data_limite: await getData(pedido.data_limite),
            data_semana: await getSemana(pedido.data_semana),
          }))
        );
    
        setPedidos(pedidosTransformados);
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

      {isLoading && userData?.tipo === "" ? (
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
            <span className="bg-slate-200 text-xs p-0.5 rounded-sm">
              Id: {userData?.id_pessoa}
            </span>
            <h2 className="text-xl font-semibold ">{userData?.nome}</h2>
            <p>{userData?.email}</p>
            <p className="mt-1 text-sm font-bold">
              Tipo de Cadastro:
              <span className="capitalize font-normal"> {userData?.tipo}</span>
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Informações adicionais
        </h3>
        {userData?.tipo === "cliente" && (
          <div>
            {/* filtrar fk_id_cliente = userData?.id_pessoa */}
            <h4 className="text-gray-600">Seus pedidos</h4>
            <div className="">
              {pedidos
                .filter((item) => item.fk_id_cliente === userData?.id_pessoa)
                // Ordenar por data_pedido ao contrário
                .sort((a, b) => (a.data_pedido > b.data_pedido ? -1 : 1))
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
        {userData?.tipo === "admin" && (
          <div>
            <h4 className="text-gray-600">Todos os pedidos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pedidos.map((item) => (
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
        {/* {userData?.tipo === "barman" && (
          <div>
            <h4 className="text-gray-600">Seus agendamentos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pedidos
                .filter((item) => item.fk_id_barman === userData?.id_pessoa)
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
        )} */}
        {/* {userData?.tipo === "entregador" && (
          <div>
            <h4 className="text-gray-600">Seus agendamentos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pedidos
                .filter((item) => item.fk_id_entregador === userData?.id_pessoa)
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
        )} */}
      </div>
    </div>
  );
};

export default withPageAuthRequired(Profile);
