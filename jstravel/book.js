let counts = [0, 0, 0,0,0,0,0,0,0];
let prices = [1,4186000,2110000,14990000, 19990000, 29990000,12990000,14990000,17990000,,];
let totalPrices = [0,0,0,0,0,0,0,0,0];
function preventDefaultBehavior(event) {
    event.preventDefault();
}

function updateCounter(index) {
    document.getElementById("counter" + index).innerText = counts[index];
    totalPrices[index] = counts[index] * prices[index];
    document.getElementById("total-price" + index).innerText = totalPrices[index].toLocaleString() + " VND";
}

function updateBookCount(index) {
    document.getElementById("book-count" + index).innerText = `${counts[index]} khách đặt trong 24h qua`;
}
function increase(index) {
    counts[index]++;
    updateCounter(index);
}

function decrease(index) {
    if (counts[index] > 0) {
        counts[index]--;
        updateCounter(index);
    }
}

var defaultLinks = document.querySelectorAll('.bookdefault');
defaultLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        preventDefaultBehavior(event);
    });
});

document.querySelectorAll('.book-now').forEach((button, index) => {
    button.addEventListener('click', function () {
        // Hiển thị toast message
document.querySelector('.cart-badge').innerText = `${counts[index]}`

        var toast = document.querySelector(".toast");
        toast.innerText = `Đặt tour thành công!
            Số lượng khách: ${counts[index]} đã được thêm vào giỏ hàng
            Tổng giá tiền: ${totalPrices[index].toLocaleString()} VND
            Vui Lòng Đợi Số Hotline:0931434112 liên hệ`
        toast.classList.remove("hidden");
        toast.classList.add("show");
        // Ẩn toast message sau 3 giây
        setTimeout(function () {
            toast.classList.remove("show");
            toast.classList.add("hidden");
        }, 5000);
        updateBookCount(index);
    });
});
function getSelectedProductInfo(index) {
    const productInfo = {
        productName: document.querySelector(`.book_link-body-header${index}`)?.innerText || "Tên sản phẩm không xác định",
        numberOfPeople: counts[index],
        totalPrice: totalPrices[index],
        items: [],
        imgSrc: "Đường dẫn ảnh không xác định",
    };

    // Thêm thông tin từ thẻ li vào mảng
    const listItemContainer = document.querySelectorAll(`.book_link-body-list.product-list`);
    const listItems = listItemContainer[index]?.querySelectorAll('.book_link-body-item') || [];

    listItems.forEach(item => {
        productInfo.items.push(item.innerText);
    });

    // Thêm thông tin từ thẻ img vào mảng
    const imgElements = document.querySelectorAll('.book_link-img');
    if (imgElements.length > index) {
        // Kiểm tra xem có ảnh nào ở chỉ mục index không
        productInfo.imgSrc = imgElements[index].src;
    }

    return productInfo;
}


document.querySelectorAll('.book-now').forEach((button, index) => {
    button.addEventListener('click', function () {
        console.log('Button clicked for product index', index);

        // Lấy thông tin sản phẩm được chọn
        const selectedProductInfo = getSelectedProductInfo(index);
        console.log('Selected product info:', selectedProductInfo);

        // Lưu thông tin sản phẩm được chọn trong local storage để trang mới có thể lấy
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProductInfo));

        // Chuyển hướng đến trang sản phẩm
       // Lấy thẻ cart
        const cartElement = document.querySelector('.header_cart');

// Thêm sự kiện click cho thẻ cart
        cartElement.addEventListener('click', function () {
            // Chuyển hướng đến trang giỏ hàng (sản phẩm) ở đây
            window.location.href = 'sanpham.html';
        });

    });
});
