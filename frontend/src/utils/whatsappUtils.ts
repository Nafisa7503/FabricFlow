
export const openWhatsApp = (phoneNumber: string, message: string) => {
  // Remove any non-numeric characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Add country code if not present (assuming Bangladesh)
  const formattedPhone = cleanPhone.startsWith('880') ? cleanPhone : `880${cleanPhone}`;
  
  // Create WhatsApp URL with phone and encoded message
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  // Open in new tab
  window.open(whatsappUrl, '_blank');
};

export const getBirthdayMessage = (customerName: string) => {
  return `Dear ${customerName}, Happy Birthday! 🎉 Celebrate your special day with a new outfit from Fabric Flow - weave your style! Enjoy 10% off on your next purchase. Visit us soon! 🎁`;
};

export const getSpecialOfferMessage = (customerName: string) => {
  return `Hello ${customerName}, We miss you at Fabric Flow! 👋 Enjoy a special 15% discount on your next purchase. Drop by and let us help you weave your unique style! 🎯`;
};

export const getOrderReadyMessage = (customerName: string, orderId: string) => {
  return `Dear ${customerName}, your order ${orderId} is ready for pickup at Fabric Flow! 🎉 We're excited for you to see your custom tailored item. Please visit our shop during business hours to collect it.`;
};

export const getOrderStatusMessage = (customerName: string, orderId: string, status: string) => {
  return `Dear ${customerName}, your order ${orderId} status has been updated to: ${status}. For any questions, please contact us. Thank you for choosing Fabric Flow - weave your style!`;
};
