// Data for Products
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
      { id: 4, name: "Kopi Liong", img: "liong-bulan.jpg", price: 20000 },
      { id: 5, name: "Kopi Kapal Api", img: "kapal-api.jpg", price: 16000 },
    ],
  }));

  // Data for Shopping-cart
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    // Method add
    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem);

      // Jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barangnya sama atau beda dengan yang ada di cart
        this.items = this.items.map((item) => {
          // Jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total = item.price;
            return item;
          }
        });
      }
    },
  });
});
