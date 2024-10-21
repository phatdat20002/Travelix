    Validator({
        form: 'register-form',
        errorElement: '.form-message',
        rules: [
            Validator.isRequired('#fullname'),
            Validator.isEmail('#email'),
            Validator.isMin('#password', 6),
            Validator.isConfirmation('#password_confirmation', function () {
                return document.getElementById('password').value;
            })
        ],
        onsubmit: function (formData) {
            console.log('Dữ Liệu Người Dùng Nhập Vào: ', formData);
            
            // Display sliding toast message with user information
            var toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerText = 'Đăng ký thành công!\n' + 
                            'Tên Đăng Nhập:' + formData.fullname + '\n' +
                            'Email: ' + formData.email + '\n' +
                            'Mật khẩu: ' + formData.password + '\n' + 
                            'Vui Lòng Không Tiết Lộ Tài Khoản Và Mật Khẩu Cho Bất Kì Ai \n' + 
                            'Vui Lòng Kiểm Tra Thông Tin Hệ Thống Sẽ:'
            document.body.appendChild(toast);

    // Đặt thời gian đếm ngược (5 giây)
    var countdown = 5;
    var countdownInterval = setInterval(function() {
        countdown--;
    toast.innerText += '\nTự động đóng sau ' + countdown + ' giây';
    if (countdown <= 0) {
        document.body.removeChild(toast);
        clearInterval(countdownInterval);
    }
}, 1000);  // Đếm ngược mỗi 1000ms (1 giây)

            // Slide in the toast
            setTimeout(function () {
                toast.style.left = '20px';
            }, 100);

            // Hide the registration form
            var modal = document.querySelector('.modal');
            modal.style.display = 'none';
        }
    });