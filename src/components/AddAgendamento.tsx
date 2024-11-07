import React, {useState, useEffect} from "react";
import InfoCart from "./InfoCart";
import { useUser } from "@auth0/nextjs-auth0/client";
import FormPedido from "./FormPedido";

const AgendamentoForm: React.FC = () => {

  
  const [carrinho, setCarrinho] = useState<
  { id_cafe: number; nome: string; preco: number; quantidade: number }[]
>([]);

const { user } = useUser();

useEffect(() => {
  const carrinhoLocalstorage = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
  );

  if (carrinhoLocalstorage.length > 0) {
    const novoCarrinho: {
      id_cafe: number;
      nome: string;
      preco: number;
      quantidade: number;
    }[] = [];
    carrinhoLocalstorage.forEach(
      (item: {
        id_cafe: number;
        nome: string;
        preco: number;
        quantidade: number;
      }) => {
        const item_existente = novoCarrinho.find(
          (i) => i.id_cafe === item.id_cafe
        );
        if (item_existente) {
          item_existente.quantidade += item.quantidade;
        } else {
          novoCarrinho.push(item);
        }
      }
    );
    setCarrinho(novoCarrinho);
  }
}, []);

  return (
    <div className="p-4  mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Informações do Pedido</h2>

      <div className="p-4 text-center mb-6 border-b-2">
        <InfoCart carrinho={carrinho} />
      </div>

      {carrinho.length !== 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Configure o agendamento
          </h2>

          <FormPedido carrinho={carrinho} user_id={user?.sub || ''} />

          
        </div>
      )}
    </div>
  );
};

export default AgendamentoForm;
