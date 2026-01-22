
        let cart = [];

        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));

            // Show selected page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Update navigation active state
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
                    link.classList.add('active');
                }
            });

            // Scroll to top
            window.scrollTo(0, 0);

            if (pageId === 'cart') {
                updateCartUI();
            }
        }

        function addToCart(event, name, price, image) {
            if (event) {
                event.stopPropagation();
            }
            
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }
            
            updateCartBadge();
            alert(`${name} added to cart!`);
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
            updateCartBadge();
        }

        function updateCartBadge() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelector('.cart-badge').textContent = totalItems;
        }

        function updateCartUI() {
            const cartItemsContainer = document.getElementById('cart-items');
            const subtotalEl = document.getElementById('cart-subtotal');
            const totalEl = document.getElementById('cart-total');
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; color: #b8b8d1; margin-top: 50px;">Your cart is empty</p>';
                subtotalEl.textContent = '$0';
                totalEl.textContent = '$0';
                return;
            }

            let html = '';
            let subtotal = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                html += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h3>${item.name}</h3>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                        <div class="cart-item-actions">
                            <div class="cart-item-price">$${itemTotal}</div>
                            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    </div>
                `;
            });

            cartItemsContainer.innerHTML = html;
            subtotalEl.textContent = `$${subtotal}`;
            totalEl.textContent = `$${subtotal}`; // Shipping is $0 for now
        }

        const productsData = {
            1: { name: 'Freshly Baked Mixer 2,000W', price: 259, category: 'Kitchen Appliances', rating: 5, reviews: 48, image: 'https://images.unsplash.com/photo-1594385200330-b73b2fc3ca84?auto=format&fit=crop&q=80&w=400' },
            2: { name: 'SmartChef Multi-Oven Dash 400W', price: 149, category: 'Kitchen Appliances', rating: 4, reviews: 32, image: 'https://images.unsplash.com/photo-1527335448673-41a058bd0509?auto=format&fit=crop&q=80&w=400' },
            3: { name: 'PowerBlend Pro Blender', price: 110, category: 'Kitchen Appliances', rating: 5, reviews: 56, image: 'https://images.unsplash.com/photo-1570222037471-9bb0c3f09dd3?auto=format&fit=crop&q=80&w=400' },
            4: { name: 'MultiCook Digital Oven', price: 459, category: 'Kitchen Appliances', rating: 5, reviews: 42, image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=400' },
            5: { name: 'MultiClean Vacuum Cleaner', price: 149, category: 'Cleaning Appliances', rating: 4, reviews: 28, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=400' },
            6: { name: 'SteamPro Anti-Bacterial Cleaner', price: 179, category: 'Cleaning Appliances', rating: 5, reviews: 35, image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=400' },
            7: { name: 'PureVac Series Robot Vacuum', price: 209, category: 'Cleaning Appliances', rating: 5, reviews: 64, image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=400' },
            8: { name: 'EcoStay Steam Iron 200W', price: 125, category: 'Laundry & Cooling', rating: 4, reviews: 19, image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=400' },
            9: { name: 'CoolBreeze Tower Fan', price: 89, category: 'Laundry & Cooling', rating: 4, reviews: 45, image: 'https://images.unsplash.com/photo-1591147139225-856bb2a7e74d?auto=format&fit=crop&q=80&w=400' },
            10: { name: 'ArcticPro Air Conditioner 12,000 BTU', price: 549, category: 'Laundry & Cooling', rating: 5, reviews: 72, image: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&q=80&w=400' },
            11: { name: 'SuperDry Hair Dryer 1,500W', price: 79, category: 'Personal Care', rating: 4, reviews: 23, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=400' },
            12: { name: 'Precision Electric Trimmer', price: 59, category: 'Personal Care', rating: 4, reviews: 15, image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=400' },
            13: { name: 'SilkSmooth Electric Shaver', price: 129, category: 'Personal Care', rating: 4, reviews: 31, image: 'https://images.unsplash.com/photo-1619914771257-238515059632?auto=format&fit=crop&q=80&w=400' },
            14: { name: 'SmartHub Voice Assistant', price: 149, category: 'Smart Home', rating: 5, reviews: 88, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=400' },
            15: { name: 'SmartBulb Color Zone 3-pack', price: 79, category: 'Smart Home', rating: 5, reviews: 52, image: 'https://images.unsplash.com/photo-1550524514-963ddec33621?auto=format&fit=crop&q=80&w=400' },
            16: { name: 'GuardView Smart Camera', price: 129, category: 'Smart Home', rating: 5, reviews: 41, image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=400' },
            17: { name: 'ThermoSmart WiFi Thermostat', price: 229, category: 'Smart Home', rating: 5, reviews: 37, image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&q=80&w=400' }
        };

        let currentCategory = 'All Products';
        let searchQuery = '';

        function renderProducts() {
            const grid = document.querySelector('.products-grid');
            const productCount = document.querySelector('.products-header p');
            const showingInfo = document.querySelector('.showing-info span');
            
            if (!grid) return;

            const filteredProducts = Object.entries(productsData).filter(([id, product]) => {
                const matchesCategory = currentCategory === 'All Products' || product.category === currentCategory;
                const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            if (productCount) productCount.textContent = `${filteredProducts.length} products found`;
            if (showingInfo) showingInfo.textContent = currentCategory;

            grid.innerHTML = filteredProducts.map(([id, product]) => `
                <div class="product-card" onclick="showProductDetail(${id})">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-rating">
                            <span class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5-product.rating)}</span>
                            <span class="rating-count">(${product.reviews} reviews)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">$${product.price}</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(event, '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }

        // Initialize products on load
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();

            // Search functionality
            const searchInput = document.querySelector('.search-box input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    searchQuery = e.target.value;
                    showPage('products');
                    renderProducts();
                });
            }

            // Filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentCategory = btn.textContent;
                    renderProducts();
                });
            });
        });

        function showProductDetail(productId) {
            const product = productsData[productId];
            if (!product) return;

            const content = `
                <div class="breadcrumb">
                    Home <span>></span> Products <span>></span> ${product.category} <span>></span> ${product.name}
                </div>
                
                <div class="product-main">
                    <div class="product-gallery">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="gallery-thumbs">
                            <img src="${product.image}" class="active">
                            <img src="${product.image}">
                            <img src="${product.image}">
                            <img src="${product.image}">
                        </div>
                    </div>
                    
                    <div class="product-essential">
                        <h1>${product.name}</h1>
                        <div class="detail-rating">
                            <span class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5-product.rating)}</span>
                            <span class="rating-count">(${product.reviews} reviews)</span>
                            <span style="color: #b8b8d1;">Code: ${192300 + productId}</span>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <p style="color: #b8b8d1; margin-bottom: 10px;">Color: <span style="color: #fff;">Modern Silver</span></p>
                            <div style="width: 50px; height: 50px; border: 2px solid #ff6b35; border-radius: 8px; overflow: hidden;">
                                <img src="${product.image}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 30px;">
                            <p style="color: #b8b8d1; margin-bottom: 10px;">Specifications Overview:</p>
                            <table class="specs-table" style="font-size: 14px;">
                                <tr><td class="spec-label">RAM</td><td>12 GB</td></tr>
                                <tr><td class="spec-label">Processor</td><td>TechCore A19 Pro</td></tr>
                                <tr><td class="spec-label">Connectivity</td><td>Wi-Fi 6E, Bluetooth 5.3</td></tr>
                                <tr><td class="spec-label">Operating System</td><td>TechOS 1.0</td></tr>
                            </table>
                            <a href="#characteristics" style="color: #ff6b35; text-decoration: none; font-size: 14px; display: block; margin-top: 15px;">More about product</a>
                        </div>
                    </div>
                    
                    <div class="detail-price-box">
                        <p style="color: #b8b8d1; margin-bottom: 5px;">Seller: <span style="color: #fff;">★ Tech House</span></p>
                        <div class="detail-price">$${product.price}</div>
                        <div class="buy-buttons">
                            <button class="buy-now-btn" onclick="addToCart(null, '${product.name}', ${product.price}, '${product.image}'); showPage('cart');">Buy in 1 click</button>
                            <button class="cart-btn" onclick="addToCart(null, '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
                        </div>
                        
                        <div style="margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                            <p style="font-size: 14px; color: #b8b8d1;">Delivery: <span style="color: #22c55e;">Free</span></p>
                        </div>
                    </div>
                </div>
                
                <div class="detail-tabs">
                    <div class="tab-link active">About product</div>
                    <div class="tab-link">Seller offers 2</div>
                    <div class="tab-link">Characteristics</div>
                    <div class="tab-link">Reviews 0</div>
                </div>

                <div class="detail-section">
                    <h2>Seller offers</h2>
                    <div class="sellers-list">
                        <div class="seller-item">
                            <div>
                                <p style="font-size: 14px; color: #b8b8d1;">Seller: <span style="color: #fff; font-weight: bold;">Tech House Official</span></p>
                                <p style="font-size: 20px; font-weight: bold; margin: 10px 0;">$${product.price}</p>
                                <p style="font-size: 12px; color: #22c55e;">Free delivery</p>
                            </div>
                            <button class="buy-now-btn" style="padding: 10px 25px;">To cart</button>
                        </div>
                        <div class="seller-item">
                            <div>
                                <p style="font-size: 14px; color: #b8b8d1;">Seller: <span style="color: #fff; font-weight: bold;">SmartPartner</span></p>
                                <p style="font-size: 20px; font-weight: bold; margin: 10px 0;">From $${product.price + 20}</p>
                                <p style="font-size: 12px; color: #b8b8d1;">Seller delivery</p>
                            </div>
                            <button class="buy-now-btn" style="padding: 10px 25px; background: #ffcc00;">To shop</button>
                        </div>
                    </div>
                </div>

                <div id="characteristics" class="detail-section">
                    <h2>Characteristics</h2>
                    <table class="specs-table">
                        <tr><td class="spec-label">RAM</td><td>12 GB</td></tr>
                        <tr><td class="spec-label">Processor</td><td>TechCore A19 Pro</td></tr>
                        <tr><td class="spec-label">Color</td><td>Modern Silver</td></tr>
                        <tr><td class="spec-label">Display</td><td>6.7 inch SmartLED</td></tr>
                        <tr><td class="spec-label">OS</td><td>TechOS 1.0</td></tr>
                        <tr><td class="spec-label">Body Material</td><td>Glass and Aluminum</td></tr>
                        <tr><td class="spec-label">Battery</td><td>5000 mAh</td></tr>
                        <tr><td class="spec-label">Main Camera</td><td>48+48+48 MP</td></tr>
                        <tr><td class="spec-label">SIM Slots</td><td>1 (eSIM supported)</td></tr>
                        <tr><td class="spec-label">Protection</td><td>IP68 Water Resistant</td></tr>
                        <tr><td class="spec-label">Internal Memory</td><td>512 GB</td></tr>
                    </table>
                </div>

                <div class="detail-section">
                    <h2>Reviews</h2>
                    <div class="reviews-summary">
                        <div class="rating-avg">
                            <h3>0/5</h3>
                            <div class="stars">☆☆☆☆☆</div>
                        </div>
                        <div class="rating-bars">
                            ${[5,4,3,2,1].map(num => `
                                <div class="rating-bar-row">
                                    <span>${num} ★</span>
                                    <div class="bar-bg"><div class="bar-fill" style="width: 0%"></div></div>
                                    <span>0</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <div style="display: flex; gap: 20px;">
                            <select style="background: #1a1335; color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 10px; border-radius: 8px;">
                                <option>By rating</option>
                            </select>
                            <select style="background: #1a1335; color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 10px; border-radius: 8px;">
                                <option>All ratings</option>
                            </select>
                        </div>
                    </div>
                    
                    <p style="text-align: center; color: #b8b8d1; margin: 40px 0;">No reviews found yet.</p>
                    
                    <div style="text-align: right;">
                        <button class="leave-review-btn">Leave a review</button>
                    </div>
                </div>
            `;

            document.getElementById('product-detail-content').innerHTML = content;
            showPage('product-detail');
        }
