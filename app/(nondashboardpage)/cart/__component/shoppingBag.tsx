import CartItem from "./cartItem"
import EmptyCartItem from "./emptyCartItem"

export default function ShoppingBag({ cartExist }: { cartExist: boolean }) {
  return (
    <div className="border-1 border-[#202020CC] rounded-[20px]">
      {cartExist ? (
        <div>
          <CartItem />
        </div>
      ) : (
        <div>
          <EmptyCartItem />
        </div>
      )}
    </div>
  )
}
