import { TrashIcon } from "@heroicons/react/24/outline";

interface carrinho {
  id_cafe: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface InfoCartProps {
  carrinho: carrinho[];
  setCarrinho: (carrinho: carrinho[]) => void;
}

interface CarrinhoItem {
  id_cafe: number;
  nome: string;
  descricao: string;
  tipo: string;
  tamanho: string;
  imagem: string;
  preco: number;
  quantidade: number;
}

export default function InfoCart({ carrinho, setCarrinho }: InfoCartProps) {
  const atualizarCarrinho = (id_cafe: number) => {
    setCarrinho(
      carrinho
        .map((i) =>
          i.id_cafe === id_cafe ? { ...i, quantidade: i.quantidade - 1 } : i
        )
        .filter((i) => i.quantidade > 0)
    );

    // Atualizar o localstorage
    localStorage.setItem(
      "carrinho",
      JSON.stringify(
        carrinho
          .map((i) =>
            i.id_cafe === id_cafe ? { ...i, quantidade: i.quantidade - 1 } : i
          )
          .filter((i) => i.quantidade > 0)
      )
    );
  };

  return (
    <div className="mb-6">
      {carrinho.length === 0 ? (
        <div className="bg-white p-4 rounded shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Carrinho Vazio
          </h2>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Carrinho</h2>
          <ul>
            {carrinho.map((item) => (
              <li key={item.id_cafe} className="flex justify-between">
                <div className="flex gap-x-1">
                  <span>
                    {item.nome} x {item.quantidade}
                  </span>
                  <button
                    onClick={() => atualizarCarrinho(item.id_cafe)}
                    className="text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>

                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              R${" "}
              {carrinho
                .reduce((acc, item) => acc + item.preco * item.quantidade, 0)
                .toFixed(2)}
            </span>
          </div>
          <button className="mt-4 px-4 py-2 bg-coffe text-white rounded-lg hover:bg-coffe/85 transition">
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  );
}
