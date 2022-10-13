import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { postCart } from "../redux/actions";

export default function Cart() {
  //Mapeo de Productos Seleccionados
  const dispatch=useDispatch()

  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);
  const User = useSelector((state) => state.user);

  const cart1 = useSelector((state) => state.cart);
  let cart = JSON.parse(localStorage.getItem("bookDetail"));
  //Si esta logueado guardas el carrito al id del usuario
  
  async function handleClick(){
    if(LOGIN){
      await dispatch(postCart({email:User.email,cart}))
    }
  
  }
  return (
    <div className="flex flex-row">
      <Link to="/">
        <h3 className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white">
          &#129044; Regresar
        </h3>
      </Link>
      <div className="m-10">
        {cart?.map((c) => {
          return <CartItem key={c.id} book={c} />;
        })}
      </div>
      <div className="mt-20 text-lg font-medium pr-4">
        Resumen de Pedido
        <h3 className="text-[#333333]">
          Total:{" "}
          <span className="text-black font-bold">
            $
            {cart?.reduce((ac, e) => {
                return ac + e.price * e.quantity;
              }, 0)
              .toFixed(2)}
          </span>
        </h3>
        <Link to={LOGIN === 1 && ROLE === "USER" ? `/order` : `/login`}>
          <button className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 bg-button text-white" onClick={handleClick}>
            Procesar Compra
          </button>
        </Link>
      </div>
    </div>
  );
}
