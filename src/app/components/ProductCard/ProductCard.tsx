import { useIsProductFavorite } from "@/app/hooks/useIsProductFavorite";
import { calculatePriceWithDiscount } from "@/app/helpers";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductCard({
  product,
  setFavorites,
}: ProductCardProps) {
  const isFavorite = useIsProductFavorite(product.id);

  const addToFavorites = (product: Product) => {
    setFavorites((favorites) => [...favorites, product]);
  };

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4">
        <Image
          src={product.fotos[0].src}
          className="card-img-top rounded-top-4 object-fit-cover w-100"
          alt={product.fotos[0].titulo}
          width={300}
          height={300}
        />

        <div className="card-body d-flex flex-column">
          <span className="badge text-success-emphasis bg-success-subtle border border-success-subtle align-self-start mb-2">
            {product.desconto}% de desconto
          </span>

          <h6 className="card-title fw-semibold mb-1">{product.nome}</h6>

          <span className="text-body-secondary small text-decoration-line-through">
            R$ {product.preco}
          </span>

          <p className="fs-5 fw-bold mb-3">
            R${" "}
            {calculatePriceWithDiscount(
              Number(product.preco),
              product.desconto
            )}
          </p>

          <button
            className={
              isFavorite
                ? "btn btn-success d-block w-100 mt-auto rounded-3"
                : "btn btn-primary d-block w-100 mt-auto rounded-3"
            }
            type="button"
            onClick={() => addToFavorites(product)}
            disabled={isFavorite}
          >
            {isFavorite ? "Favoritado" : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}
