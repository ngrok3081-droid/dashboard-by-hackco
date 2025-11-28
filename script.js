// بيانات تسجيل الدخول
const validUsername = "hackco";
const validPassword = "12345";

// عناصر DOM
const loginContainer = document.getElementById('loginContainer');
const dashboard = document.getElementById('dashboard');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// التحقق من تسجيل الدخول
loginBtn.addEventListener('click', function() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === validUsername && password === validPassword) {
        // تسجيل الدخول ناجح
        loginContainer.style.display = 'none';
        dashboard.style.display = 'block';
        errorMessage.style.display = 'none';
    } else {
        // تسجيل الدخول فاشل
        errorMessage.style.display = 'block';
        usernameInput.style.borderColor = '#e74c3c';
        passwordInput.style.borderColor = '#e74c3c';
        
        // إعادة تعيين اللون بعد فترة
        setTimeout(() => {
            usernameInput.style.borderColor = '#e1e5eb';
            passwordInput.style.borderColor = '#e1e5eb';
        }, 2000);
    }
});

// تسجيل الخروج
logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginContainer.style.display = 'flex';
    dashboard.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
});

// السماح بالضغط على Enter لتسجيل الدخول
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// حساب الإجمالي عند تغيير الكمية
document.querySelectorAll('.counts').forEach(input => {
    input.addEventListener('input', function() {
        const row = this.closest('tr');
        const priceText = row.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        const count = parseInt(this.value) || 0;
        const total = price * count;
        row.querySelector('.total').textContent = '$' + total;
    });
});

// إضافة منتج جديد
document.getElementById('addproduct').addEventListener('click', function() {
    const name = document.getElementById('newName').value;
    const price = document.getElementById('newPrice').value;
    
    if (name && price) {
        const tbody = document.querySelector('table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${name}</td>
            <td><span class="price">$${price}</span></td>
            <td class="count"><input type="number" class="counts"></td>
            <td class="total"></td>
        `;
        
        tbody.appendChild(newRow);
        
        // إضافة حدث لحساب الإجمالي للمنتج الجديد
        newRow.querySelector('.counts').addEventListener('input', function() {
            const row = this.closest('tr');
            const priceText = row.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const count = parseInt(this.value) || 0;
            const total = price * count;
            row.querySelector('.total').textContent = '$' + total;
        });
        
        // مسح حقلي الإدخال
        document.getElementById('newName').value = '';
        document.getElementById('newPrice').value = '';
    }
});