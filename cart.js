        document.addEventListener('DOMContentLoaded', function() {
            const cartContainer = document.getElementById('cart-items');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (cart.length === 0) {
                return; // Показуємо повідомлення про порожній кошик
            }
            
            // Очищаємо контейнер
            cartContainer.innerHTML = '';
            
            let total = 0;
            
            // Додаємо товари до кошика
            cart.forEach((item, index) => {
                const priceNumber = parseFloat(item.price.replace(/[^\d.]/g, ''));
                const itemTotal = priceNumber * item.quantity;
                total += itemTotal;
                
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-total">${itemTotal.toFixed(2)} грн</div>
                    <button class="remove-btn" data-index="${index}">Видалити</button>
                `;
                
                cartContainer.appendChild(itemElement);
            });
            
            // Додаємо підсумок
            const summaryElement = document.createElement('div');
            summaryElement.className = 'cart-summary';
            summaryElement.innerHTML = `
                <div class="total-price">Загальна сума: ${total.toFixed(2)} грн</div>
                <button class="btn" id="checkout-btn">Оформити замовлення</button>
            `;
            
            cartContainer.appendChild(summaryElement);
            
            // Обробники подій для кнопок
            document.querySelectorAll('.minus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    if (cart[index].quantity > 1) {
                        cart[index].quantity -= 1;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        location.reload();
                    }
                });
            });
            
            document.querySelectorAll('.plus').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    cart[index].quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                });
            });
            
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                });
            });
            
            document.getElementById('checkout-btn').addEventListener('click', function() {
                alert('Замовлення оформлено! Дякуємо за покупку!');
                localStorage.removeItem('cart');
                location.reload();
            });
        });