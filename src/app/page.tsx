"use client";

import ProductsInitial from "@/components/Products";
import ListPedido from "@/components/ListPedidos";
import InfoCart from "@/components/InfoCart";
// import Image from "next/image";
import styles from "./page.module.css";
import { cafe } from "../app/content";
import { useState, useEffect } from "react";

// Definindo a função Home
export default function Home() {
  // Definindo o estado da aba ativa
  const [activeTab, setActiveTab] = useState(0);
  // Definindo o estado do café selecionado, array vazio com campos id, nome, preco e quantidade
  const [carrinho, setCarrinho] = useState<
    { id_cafe: number; nome: string; preco: number; quantidade: number }[]
  >([]);
  const [alerta, setAlerta] = useState<string | null>(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Função para carregar o carrinho do localstorage
  useEffect(() => {
    const carrinhoLocalstorage = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );

    // Verifica se o carrinho já existe no localStorage
    if (carrinhoLocalstorage.length > 0) {
      // Verifica se há itens duplicados e atualiza as quantidades
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

  const addCarrinho = (id_cafe: number, nome: string, preco: number) => {
    // Adicionando o item ao carrinho
    setCarrinho((carrinho) => {
      const item_existente = carrinho.find((item) => item.id_cafe === id_cafe);
      if (item_existente) {
        return carrinho.map((item) =>
          item.id_cafe === id_cafe
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...carrinho, { id_cafe, nome, preco, quantidade: 1 }];
      }
    });

    // Adicionar o carrinho no localstorage para persistir os dados
    localStorage.setItem(
      "carrinho",
      JSON.stringify([...carrinho, { id_cafe, nome, preco, quantidade: 1 }])
    );

    setAlerta(nome + " adicionado ao carrinho");
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="py-2 bg-white shadow-lg rounded-lg">
          {/* Renderizando as abas */}
          <div className="flex justify-around mb-2 border-b-2 border-gray-200">
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === 0
                  ? "text-coffe border-b-2 border-coffe"
                  : "text-gray-600 hover:text-coffe"
              }`}
              onClick={() => setActiveTab(0)}
            >
              Cardapio
            </button>
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === 1
                  ? "text-coffe border-b-2 border-coffe"
                  : "text-gray-600 hover:text-coffe"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Pedidos
            </button>
          </div>

          {/* Renderizando o conteúdo da aba ativa */}
          <div>
            {activeTab === 0 && (
              <div className=" bg-black p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-coffe">
                  Cardápio Digital
                </h1>
                {mostrarAlerta && (
                  <div
                    className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-green-200 text-green-800 rounded shadow-md transition-all duration-300 ease-in-out`}
                  >
                    {alerta}
                  </div>
                )}

                {/* Exibir o carrinho ou informações do carrinho */}
                <InfoCart carrinho={carrinho} setCarrinho={setCarrinho} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cafe.map((item) => (
                    <ProductsInitial
                      key={item.id_cafe}
                      item={item}
                      addCarrinho={addCarrinho}
                    />
                  ))}
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className=" bg-black p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-white">
                  Seus Agendamentos
                </h1>
                <ListPedido />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
