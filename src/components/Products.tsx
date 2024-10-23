import Image from "next/image";

interface ProductsInitialProps {
  nome: string;
  descricao: string;
  tipo: string;
  tamanho: string;
  preco: number;
  imagem: string;
}

export default function ProductsInitial({
  nome,
  descricao,
  tipo,
  tamanho,
  preco,
  imagem,
}: ProductsInitialProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm">
      {/* <img
        src={`/cafe/${imagem}`}
        alt={nome}
        className="w-full h-48 object-cover"
      /> */}
      <Image
        src={`/cafe/${imagem}`}
        alt={nome}
        width={500}
        height={300}
        objectFit="cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{nome}</h3>
        <p className="text-sm text-gray-700">{descricao}</p>
        <div className="mt-2">
          <span className="text-sm text-gray-600">Tipo: {tipo}</span>
          <br />
          <span className="text-sm text-gray-600">Tamanho: {tamanho}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            R$ {preco.toFixed(2)}
          </span>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
