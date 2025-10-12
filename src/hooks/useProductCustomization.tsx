import { useReducer } from 'react'

// --- Types ---
export type CustomizationAction =
   | { type: 'fitting'; payload: Fitting }
   | { type: 'size'; payload: CartProductSize }
   | { type: 'quantity'; payload: number }
   | { type: 'shirtMeasurement'; payload: Partial<ShirtMeasurement> }
   | { type: 'trouserMeasurement'; payload: Partial<TrouserMeasurement> }

export interface ProductCustomizationState {
   productId: string
   fitting: Fitting
   quantity: number
   size: CartProductSize
   shirtMeasurement: ShirtMeasurement
   trouserMeasurement: TrouserMeasurement
}

// --- Reducer ---
function productCustomizationReducer(state: ProductCustomizationState, action: CustomizationAction): ProductCustomizationState {
   switch (action.type) {
      case 'fitting':
         return { ...state, fitting: action.payload }

      case 'size':
         return { ...state, size: action.payload }

      case 'quantity':
         return { ...state, quantity: action.payload }

      case 'shirtMeasurement':
         return {
            ...state,
            shirtMeasurement: {
               ...state.shirtMeasurement,
               ...action.payload, 
            },
         }

      case 'trouserMeasurement':
         return {
            ...state,
            trouserMeasurement: {
               ...state.trouserMeasurement,
               ...action.payload, 
            },
         }

      default:
         return state
   }
}

// --- Hook Wrapper ---
export function useProductCustomization(initialState: ProductCustomizationState) {
   const [state, dispatch] = useReducer(productCustomizationReducer, initialState)

   const setFitting = (fitting: Fitting) =>
      dispatch({ type: 'fitting', payload: fitting })

   const setSize = (size: Size) =>
      dispatch({ type: 'size', payload: size })

   const setQuantity = (quantity: number) =>
      dispatch({ type: 'quantity', payload: quantity })

   const setShirtMeasurements = (measurements: Partial<ShirtMeasurement>) =>
      dispatch({ type: 'shirtMeasurement', payload: measurements })

   const setTrouserMeasurements = (measurements: Partial<TrouserMeasurement>) =>
      dispatch({ type: 'trouserMeasurement', payload: measurements })

   return { state, setFitting, setSize, setQuantity, setShirtMeasurements, setTrouserMeasurements }
}
