import Image from "next/image";

interface Product {
  id_catalogo: number;
  nome: string;
  descricao: string;
  tipo: string;
  tamanho: string;
  imagem: string;
  preco: number;
}

interface CardapioProps {
  item: Product;
  addCarrinho?: (id_catalogo: number, nome: string, preco: number) => void;
}

export default function ProductsInitial({ item, addCarrinho }: CardapioProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm">
      <Image
        src={`/cafe/${item.imagem}`}
        alt={item.nome}
        width={500}
        height={300}
        objectFit="cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{item.nome}</h3>
        <p className="text-sm text-gray-700">{item.descricao}</p>
        <div className="mt-2">
          <span className="text-sm text-gray-600">Tipo: {item.tipo}</span>
          <br />
          <span className="text-sm text-gray-600">Tamanho: {item.tamanho}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            R$ {item.preco.toFixed(2)}
          </span>
          {addCarrinho && (
            <button
              onClick={() => addCarrinho(item.id_catalogo, item.nome, item.preco)}
              className="px-4 py-2 bg-coffe text-white rounded-lg hover:bg-coffe/85 transition"
            >
              Adicionar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
