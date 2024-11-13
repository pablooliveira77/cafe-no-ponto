import { TrashIcon } from "@heroicons/react/24/outline";

interface carrinho {
  id_catalogo: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface InfoCartProps {
  carrinho: carrinho[];
  setCarrinho?: (carrinho: carrinho[]) => void | undefined;
  handlebtn?: () => void;
}

export default function InfoCart({
  carrinho,
  setCarrinho,
  handlebtn,
}: InfoCartProps) {
  const atualizarCarrinho = (id_catalogo: number) => {
    if (setCarrinho) {
      setCarrinho(
        carrinho
          .map((i) =>
            i.id_catalogo === id_catalogo ? { ...i, quantidade: i.quantidade - 1 } : i
          )
          .filter((i) => i.quantidade > 0)
      );
    }

    // Atualizar o localstorage
    localStorage.setItem(
      "carrinho",
      JSON.stringify(
        carrinho
          .map((i) =>
            i.id_catalogo === id_catalogo ? { ...i, quantidade: i.quantidade - 1 } : i
          )
          .filter((i) => i.quantidade > 0)
      )
    );
  };

  return (
    <div>
      {carrinho.length === 0 ? (
        <h2 className="text-lg font-semibold text-gray-900">Carrinho Vazio</h2>
      ) : (
        <div className="text-left">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Carrinho</h2>
          <ul>
            {carrinho.map((item) => (
              <li key={item.id_catalogo} className="flex justify-between">
                <div className="flex gap-x-1">
                  <span>
                    {item.nome} x {item.quantidade}
                  </span>
                  <button
                    onClick={() => atualizarCarrinho(item.id_catalogo)}
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
            <span className="text-lg font-semibold text-gray-900">Total café</span>
            <span className="text-lg font-semibold text-gray-900">
              R${" "}
              {carrinho
                .reduce((acc, item) => acc + item.preco * item.quantidade, 0)
                .toFixed(2)}
            </span>
          </div>
          {handlebtn && (
            <button
              onClick={handlebtn}
              className="mt-4 px-4 py-2 bg-coffe text-white rounded-lg hover:bg-coffe/85 transition"
            >
              Finalizar Pedido
            </button>
          )}
        </div>
      )}
    </div>
  );
}
