document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000 },
      { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000 },
      { id: 3, name: 'Primo Passo', img: '3.jpg', price: 30000 },
      { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 37000 },
      { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 55000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek jika ada barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // kalo  ngga ada yang sama
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // kalo barang ada,check jika barangnya beda atau sama yang ada di cart (MASALAH BESA WAKKKK)
        this.items = this.items.map((item) => {
          // jika bag beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang udah ada, tambahin quantity dan subtotal
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
