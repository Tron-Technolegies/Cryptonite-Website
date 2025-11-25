export const sendToWhatsApp = (formData) => {
  const phoneNumber = "919539711107";

  const message = `
New Contact Form Message:

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}
  `;

  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};
