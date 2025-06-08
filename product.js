document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Перевіряємо, чи товар вже є в кошику
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    const productTitle = this.parentElement.querySelector('.product-title').textContent;
                    const productPrice = this.parentElement.querySelector('.product-price').textContent;
                    const productImg = this.parentElement.parentElement.querySelector('.product-img').src;
                    
                    cart.push({
                        id: productId,
                        title: productTitle,
                        price: productPrice,
                        img: productImg,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Товар додано до кошика!');
            });
        });