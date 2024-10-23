"use client";

import ProductsInitial from "@/components/Products";
import ListPedido from "@/components/ListPedidos";
// import Image from "next/image";
import styles from "./page.module.css";
import { cafe } from "../app/content";
import { useState } from "react";

export default function Home() {
  // Definindo o estado da aba ativa
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          {/* Renderizando as abas */}
          <div className="flex justify-around mb-4 border-b-2 border-gray-200">
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === 0
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-500"
              }`}
              onClick={() => setActiveTab(0)}
            >
              Cardapio
            </button>
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === 1
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-500"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Pedidos
            </button>
          </div>

          {/* Renderizando o conteúdo da aba ativa */}
          <div className="p-4">
            {activeTab === 0 && (
              <div className=" bg-gray-100 p-6">
                <h1 className="text-2xl font-bold text-center mb-6">
                  Cardápio Digital
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cafe.map((item) => (
                    <ProductsInitial key={item.id_cafe} {...item} />
                  ))}
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className=" bg-gray-100 p-6">
                <h1 className="text-2xl font-bold text-center mb-6">
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
