"use client";

import ProductsInitial from "@/components/Products";
import AddAgendamento from "@/components/AddAgendamento";
import InfoCart from "@/components/InfoCart";
import styles from "./page.module.css";
// import { catalogo } from "../app/content";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [carrinho, setCarrinho] = useState<
    {
      id_catalogo: number;
      nome: string;
      preco: number;
      quantidade: number;
    }[]
  >([]);
  const [alerta, setAlerta] = useState<string | null>(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [catalogo, setCatalogo] = useState<
    {
      id_catalogo: number;
      nome: string;
      descricao: string;
      tipo: string;
      tamanho: string;
      imagem: string;
      preco: number;
    }[]
  >([]);

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
    }

    const fetchCatalogo = async () => {
      const response = await fetch("/api/catalogo");
      if (!response.ok) {
        return;
      }
      const catalogo = await response.json();
      setCatalogo(catalogo);
    };

    fetchCatalogo();
  }, []);

  const addCarrinho = (id_catalogo: number, nome: string, preco: number) => {
    setCarrinho((carrinho) => {
      const item_existente = carrinho.find(
        (item) => item.id_catalogo === id_catalogo
      );
      if (item_existente) {
        return carrinho.map((item) =>
          item.id_catalogo === id_catalogo
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...carrinho, { id_catalogo, nome, preco, quantidade: 1 }];
      }
    });

    localStorage.setItem(
      "carrinho",
      JSON.stringify([...carrinho, { id_catalogo, nome, preco, quantidade: 1 }])
    );

    setAlerta(nome + " adicionado ao carrinho");
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  const handleFinalizarCompra = () => {
    setActiveTab(1);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="pt-2 bg-white shadow-lg rounded-lg">
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
              Agendamentos
            </button>
          </div>

          {/* Renderizando o conteúdo da aba ativa */}
          <div>
            {activeTab === 0 && (
              <div className=" bg-black p-6 min-h-screen">
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
                {catalogo.length > 0 ? (
                  <div>
                    {/* Exibir o carrinho ou informações do carrinho */}
                    <div className="bg-white p-4 rounded shadow-md text-center mb-6">
                      <InfoCart
                        carrinho={carrinho}
                        setCarrinho={setCarrinho}
                        handlebtn={handleFinalizarCompra}
                      />
                    </div>

                    <div id="cardapio" className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                      {catalogo.map((item) => (
                        <ProductsInitial
                          key={item.id_catalogo}
                          item={item}
                          addCarrinho={addCarrinho}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <h1 className="text-2xl font-bold">
                      Carregando Produtos...
                    </h1>
                  </div>
                )}
              </div>
            )}
            {activeTab === 1 && (
              <div className=" bg-black p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-coffe">
                  Configurar Agendamento
                </h1>
                <AddAgendamento />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
