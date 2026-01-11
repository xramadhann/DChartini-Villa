document.addEventListener("DOMContentLoaded", () => {
  // ========== NAVIGATION ==========
  const mobileNav = document.querySelector(".hamburger");
  const navbar = document.querySelector(".menubar");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  // Toggle hamburger menu
  if (mobileNav && navbar) {
    mobileNav.addEventListener("click", () => {
      navbar.classList.toggle("active");
      mobileNav.classList.toggle("hamburger-active");
    });
  }

  // Toggle dropdown kontak (mobile friendly)
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.nextElementSibling.classList.toggle("show");
    });
  }

  // Tutup dropdown jika klik di luar
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown-menu.show")
      .forEach(menu => menu.classList.remove("show"));
  });

  // ========== CHATBOT ==========
  const responses = {
    ketersediaan: {
      keywords: ['tersedia', 'available', 'kosong', 'ada kamar', 'booking', 'pesan'],
      answer: 'Untuk pemesanan, Anda dapat menghubungi kami di +62 851-6666-4733'
    },
    jumlahKamar: {
      keywords: ['berapa kamar', 'jumlah kamar', 'total kamar', 'banyak kamar', 'jenis kamar', 'tipe kamar'],
      answer: 'Hotel kami memiliki 3 jenis kamar:\n\n1. Deluxe Room (15 kamar) - Rp 500.000/malam\n2. Suite Room (8 kamar) - Rp 850.000/malam\n3. Presidential Suite (2 kamar) - Rp 1.500.000/malam'
    },
    fasilitas: {
      keywords: ['fasilitas', 'facilities', 'layanan', 'amenities', 'apa saja'],
      answer: 'Fasilitas D\'Chartini Villa:\n\n📶 WiFi gratis\n📺 Google TV\n🎤 Karaoke\n🏊 Kolam renang\n🏛️ Ballroom\n🍖 BBQ\n🕌 Musholla\n🚗 Parkiran'
    },
    harga: {
      keywords: ['harga', 'tarif', 'biaya', 'price', 'cost', 'bayar'],
      answer: 'Berikut daftar harga kamar kami:\n\n💰 Weekday (Senin-Kamis) : Rp.2.800.000/Malam \n💰 Weekend (Jumat-Minggu) : Rp.3.800.000/Malam\n'
    },
    lokasi: {
      keywords: ['lokasi', 'alamat', 'dimana', 'location', 'address'],
      answer: 'D\'Chartini Villa berlokasi di:\n📍Cipayung Datar, Kec. Megamendung, Kabupaten Bogor, Jawa Barat 16770'
    },
    kontak: {
      keywords: ['kontak', 'hubungi', 'telepon', 'email', 'contact'],
      answer: 'WhatsApp: +62 851-6666-4733\n\nKami siap melayani Anda 24/7!'
    },
    greeting: {
      keywords: ['halo', 'hai', 'hello', 'hi', 'selamat'],
      answer: 'Halo! Senang bisa membantu Anda. Ada yang bisa saya bantu mengenai D\'Chartini Villa? 😊'
    },
    thanks: {
      keywords: ['terima kasih', 'thanks', 'makasih', 'thank you'],
      answer: 'Sama-sama! Jika ada pertanyaan lain, jangan ragu untuk bertanya. Kami siap membantu! 😊'
    }
  };

  // Chatbot Functions
window.openChat = function() {
  const chatContainer = document.getElementById('chatContainer');
  const whatsappBtn = document.querySelector('.act-btn');  // ← TAMBAHAN
  
  if (chatContainer) {
    chatContainer.classList.add('active');
  }
  if (whatsappBtn) {
    whatsappBtn.style.display = 'none';  // ← TAMBAHAN: sembunyikan icon
  }
};

window.closeChat = function() {
  const chatContainer = document.getElementById('chatContainer');
  const whatsappBtn = document.querySelector('.act-btn');  // ← TAMBAHAN
  
  if (chatContainer) {
    chatContainer.classList.remove('active');
  }
  if (whatsappBtn) {
    whatsappBtn.style.display = 'flex';  // ← TAMBAHAN: tampilkan icon
  }
};

  function addMessage(message, isUser) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(contentDiv);
    const typingIndicator = document.getElementById('typingIndicator');
    messagesContainer.insertBefore(messageDiv, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTyping() {
    const typingIndicator = document.getElementById('typingIndicator');
    const messagesContainer = document.getElementById('chatMessages');
    if (typingIndicator) {
      typingIndicator.style.display = 'block';
    }
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function hideTyping() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.style.display = 'none';
    }
  }

  function findResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (let key in responses) {
      const response = responses[key];
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response.answer;
      }
    }
    
    return 'Maaf, saya belum mengerti pertanyaan Anda. Anda bisa menanyakan tentang:\n\n• Ketersediaan kamar\n• Jenis dan jumlah kamar\n• Fasilitas hotel\n• Harga kamar\n• Lokasi hotel\n• Kontak hotel\n\nSilakan coba lagi! 😊';
  }

  window.sendMessage = function() {
    const input = document.getElementById('userInput');
    if (!input) return;

    const message = input.value.trim();
    
    if (message === '') return;
    
    addMessage(message, true);
    input.value = '';
    
    showTyping();
    
    setTimeout(() => {
      hideTyping();
      const botResponse = findResponse(message);
      addMessage(botResponse, false);
    }, 1000);
  };

  window.sendQuickReply = function(message) {
    const input = document.getElementById('userInput');
    if (input) {
      input.value = message;
      window.sendMessage();
    }
  };

  window.handleKeyPress = function(event) {
    if (event.key === 'Enter') {
      window.sendMessage();
    }
  };

  // Setup event listener untuk input chatbot
  const userInput = document.getElementById('userInput');
  if (userInput) {
    userInput.addEventListener('keypress', window.handleKeyPress);
  }
});