// Data untuk products

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Kopi Good Day", img: "good-day.jpg", price: 13000 },
      {
        id: 2,
        name: "Kopi Indocafe",
        img: "indocafe.jpg",
        price: 15000,
      },
      {
        id: 3,
        name: "Kopi Torabika",
        img: "torabika.jpg",
        price: 18000,
      },
      {
        id: 4,
        name: "Kopi Liong",
        img: "liong-bulan.jpg",
        price: 20000,
      },
      {
        id: 5,
        name: "Kopi Kapal Api",
        img: "kapal-api.jpg",
        price: 16000,
      },
    ],
  }));

  // Data untuk shopping-cart
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    // Logic menambahkan data produk ke dalam isi cart
    add(newItem) {
      // Memvalidasi apakah isi cart masih kosong atau sudah ada data produk
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // Jika isi cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Memvalidasi apakah ada produk yang sama atau berbeda yang ada di dalam cart
        this.items = this.items.map((item) => {
          // Jika ada produk yang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika ada produk yang sama, maka hanya menambah quantity dan subtotalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    // Logic menghapus data produk di dalam cart
    remove(id) {
      // Memvalidasi data produk yang akan di remove di dalam cart berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);
      // Jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // Telusuri 1 per 1
        this.items = this.items.map((item) => {
          // Jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            // Untuk mengurangi produk item yang lebih dari 1
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barangnya hanya 1, maka akan menghapus data produk yang ada di dalam cart
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disable = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disable");
      checkoutButton.classList.add("disable");
    } else {
      return false;
    }
  }
  checkoutButton.disable = false;
  checkoutButton.classList.remove("disable");
});

// Kirim data ketika tombol checkout di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault(e);
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open(
    "https://wa.me/62089609014241?text=" + encodeURIComponent(message)
  );
});

// Format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
    Data Pesanan 
    ${JSON.parse(obj.items).map(
      (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})
      \n`
    )}
    TOTAL : ${rupiah(obj.total)}
    Terima Kasih`;
};
