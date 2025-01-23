function sendWhatsAppMessage(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
  
    // Format WhatsApp message
    const whatsappMessage = `New Contact Inquiry\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n` +
      `Message: ${message}`;
  
    // Specify the recipient's WhatsApp number (include country code)
    const recipientNumber = '+919037014455'; // Replace with the desired number
    
    // Links for WhatsApp App and Web
    const appLink = `whatsapp://send?phone=${recipientNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    const webLinkDesktop = `https://web.whatsapp.com/send?phone=${recipientNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    const webLinkMobile = `https://wa.me/${recipientNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
    // Detect device type
    const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
  
    if (isMobile) {
      // Mobile: Try to open the app first, fallback to web if app fails
      const appWindow = window.open(appLink, '_blank');
      
      // Check if app opened successfully, else fallback to WhatsApp Web
      setTimeout(() => {
        if (!appWindow || appWindow.closed || typeof appWindow.closed === 'undefined') {
          // If app link fails, open WhatsApp Web for mobile
          window.open(webLinkMobile, '_blank');
        }
      }, 1000);
    } else {
      // Desktop: Use WhatsApp Web directly to avoid xdg-open issues
      window.open(webLinkDesktop, '_blank');
    }
  }
  