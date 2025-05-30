
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';

interface WhatsAppButtonProps {
  paymentMode?: 'cod' | 'online';
  showOrderDetails?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  paymentMode = 'cod', 
  showOrderDetails = false 
}) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrder();

  const openWhatsApp = () => {
    let message = 'Hi, I would like to know more about House of Foods products.';
    
    if (showOrderDetails && cartItems.length > 0) {
      const order = addOrder(cartItems, getCartTotal(), paymentMode);
      
      message = `Hi, I would like to place an order:

Order ID: ${order.id}
Customer ID: ${order.customerId}
Payment Mode: ${paymentMode === 'cod' ? 'Cash on Delivery' : 'Online Payment'}

Order Details:
${cartItems.map(item => 
  `• ${item.product.name} (${item.size}) - Qty: ${item.quantity} - ₹${item.product.prices[item.size] * item.quantity}`
).join('\n')}

Total Amount: ₹${getCartTotal()}

Please confirm my order. Thank you!`;

      clearCart();
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916304226513?text=${encodedMessage}`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 22.16C6.398 22.16 1.64 17.4 1.64 11.8c0-5.602 4.758-10.36 10.36-10.36 5.602 0 10.36 4.758 10.36 10.36 0 5.602-4.758 10.36-10.36 10.36m0-18.34C7.08 3.82 3.1 7.8 3.1 11.8c0 4 3.98 7.98 8.9 7.98 4.92 0 8.9-3.98 8.9-8.9S16.02 3.82 12 3.82m4.5 11.38l-1.02-1.02c-.38.28-.9.48-1.48.48s-1.1-.2-1.48-.48l-1.02 1.02c.58.48 1.48.68 2.5.68s1.92-.2 2.5-.68"/>
      </svg>
    </button>
  );
};

export default WhatsAppButton;
