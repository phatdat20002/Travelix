
   //xu li su kien ng dung scroll
   const header_info = document.querySelector('.header_info')
    window.onscroll = function () {
    if (window.scrollY > 0) {
        header_info.classList.add('scroll');
    } else {
        header_info.classList.remove('scroll');

    }
};
//XU LI SU KIEN nguoi dung click vao icon search
    const searchIcon = document.querySelector('.header_info-search');
    const inputSearch = document.querySelector('.header_input-search');

    searchIcon.addEventListener('click', function (event) {
        // Ngăn chặn sự kiện click lan truyền lên các phần tử cha
        event.stopPropagation()
        inputSearch.classList.toggle('active');
       
    })
    // Xử lý sự kiện click trên ô nhập liệu để ngăn chặn ẩn đi khi click vào ô nhập liệu
    inputSearch.addEventListener('click', function (event) {
        event.stopPropagation();
    })

   //DANG KI
    const  js_register = document.querySelector('.js_register')
    const modal = document.querySelector('.modal')
    const modalmain = document.querySelector('.modal_main')
    const modalClose = document.querySelector('.modal_close')
    js_register.addEventListener("click",showmodal)
    modal.addEventListener("click",hideOnmodal)
    modalClose.addEventListener("click",hideOnmodal)
    //Hàm Hiển Thị Form Đăng Kí 
    function showmodal(){
        modal.classList.add('open')
    }
    //Hàm Ẩn Form Đăng Kí 
    function hideOnmodal(){
        modal.classList.remove('open')
    }
    ///dang nhap
    const modalmainLogin= document.querySelector('.modal_main_login')
    const modalCloselogin = document.querySelector('.modal_close_login')
    const modal_login = document.querySelector('.modal_login')
    const js_login = document.querySelector('.js_login')
    js_login.addEventListener("click",showmodalLogin)
    
    modalCloselogin.addEventListener("click",hideOnmodalLogin)

    modal_login.addEventListener("click",hideOnmodalLogin)
      //Hàm Hiển Thị Form Đăng Nhập
    function showmodalLogin(){
        modal_login.classList.add('open')
    }
    
    //Hàm Ẩn Form Đăng Nhập
    function hideOnmodalLogin(){
        modal_login.classList.remove('open')
    }
    modalmain.addEventListener("click",function(e){
        e.stopPropagation()
    })
    modalmainLogin.addEventListener("click",function(e){
        e.stopPropagation()
    })

    //su li su kien khi nguoi dung dang nhap 

    var loginForm = document.getElementById('login-form');
    var userNameInput = document.getElementById('fullnamelogin');
    var passwordInput = document.getElementById('passwordlogin');
    var formSubmitButton = document.querySelector('.form-submit');
    
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var valueName = userNameInput.value.toUpperCase(); // Chuyển đổi tên người dùng thành chữ hoa
        var valuePassword = passwordInput.value.toUpperCase(); // Chuyển đổi mật khẩu thành chữ hoa
    
        // Kiểm tra tính hợp lệ
        if (isValidUser(valueName, valuePassword)) {
            // Nếu hợp lệ, bạn có thể thực hiện các hành động khác ở đây
            alert('Đăng nhập thành công!');
            hideOnmodalLogin();
        } else if (valueName.length > 0 || valuePassword.length > 0) {
            alert('Có lỗi khi đăng nhập! Vui lòng nhập đúng tài khoản và mật khẩu.');
        } else {
            alert('Đăng nhập không hợp lệ! Vui lòng điền tài khoản và mật khẩu.');
        }
    });
    
    function isValidUser(username, password) {
        // Kiểm tra user và pass
        return username === 'ADMIN' && password === '123'; // So sánh với chữ hoa 'ADMIN'
    }
//mobile
//xu li su kien khi mo thanh menu
        const bar = document.querySelector('.header_menu-bar')
        bar.onclick = function(){
            const menubar = document.querySelector('.header-mb-bar__content')
            menubar.style.width = '320px'
        }
        //xu li xu kien dong meno
        const closebar = document.querySelector('.header-mb--bar_close')
        closebar.onclick = function(){
            const menubar = document.querySelector('.header-mb-bar__content')
            menubar.style.width = '0'
        }
///xu li su kien auto img

