import React, { useState, useEffect } from "react";
import InfoCart from "./InfoCart";
import { useUser } from "@auth0/nextjs-auth0/client";
import FormPedido from "./FormPedido";

const AgendamentoForm: React.FC = () => {
  const [clientExists, setClientExists] = useState(false);
  const [textClient, setTextClient] = useState("Carregando informações...");
  const [carrinho, setCarrinho] = useState<
    { id_catalogo: number; nome: string; preco: number; quantidade: number }[]
  >([]);

  const { user } = useUser();

  useEffect(() => {
    const carrinhoLocalstorage = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );

    if (carrinhoLocalstorage.length > 0) {
      const novoCarrinho: {
        id_catalogo: number;
        nome: string;
        preco: number;
        quantidade: number;
      }[] = [];
      carrinhoLocalstorage.forEach(
        (item: {
          id_catalogo: number;
          nome: string;
          preco: number;
          quantidade: number;
        }) => {
          const item_existente = novoCarrinho.find(
            (i) => i.id_catalogo === item.id_catalogo
          );
          if (item_existente) {
            item_existente.quantidade += item.quantidade;
          } else {
            novoCarrinho.push(item);
          }
        }
      );

      setCarrinho(novoCarrinho);

      const getClient = async (user_id: string) => {
        const response = await fetch(`/api/pessoa?id=${user_id}`);
        const data = await response.json();
        if ((data.id_pessoa = user_id)) {
          setClientExists(true);
          setTextClient("Cliente cadastrado");
        } else {
          setClientExists(false);
          setTextClient(
            "Cliente não cadastrado. Registre-se ou logue no site para poder fazer o pedido"
          );
        }
      };

      getClient(user?.sub || "");
    }
  }, [user]);

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-lg text-black">
      <h2 className="text-2xl font-semibold mb-4 ">Informações do Pedido</h2>

      <div className="p-4 text-center mb-6 border-b-2">
        <InfoCart carrinho={carrinho} />
      </div>

      {carrinho.length !== 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Configure o agendamento
          </h2>
          {clientExists ? (
            <FormPedido carrinho={carrinho} user_id={user?.sub || ""} />
          ) : (
            <div>
              <p className="text-lg font-semibold mb-4">{textClient}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgendamentoForm;
