import './scss/custom.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/custom.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/js/all.min";
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

$('#copyright').text("جميع الحقوق محفوظة للمتجر لسنة" + new Date().getFullYear());
$('.product-option input[type="radio"]').change(function() {
    $(this).parents('.product-option').siblings().removeClass('active');
    $(this).parents('.product-option').addClass();

});

//عندما تتغير كمية المنتج
$('[data-product-quantity]').on('change', function() {

    //اجلب الكمية الجديدة
    var newQuantity = $(this).val();

    //ابحث عن السطر الذي يحتوي معلومات هذا المنتج
    var parent = $(this).parents('[data-product-info]');

    //اجلب سعر القطعة الواحدة من معلومات المنتج
    var pricePerUnit = parent.attr('data-product-price');

    //السعر الإجمالي للمنتج هو سعر القطعة مضروبا بعددها
    var totalPriceForProduct = newQuantity * pricePerUnit;

    //عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذاالسطر
    parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
    calculateTotelPrice();
});

function calculateTotelPrice() {
    //أنشىء متغير جديد للسعر الاجمالي
    var totalPriceForAllProducts = 0;
    //لكل سطر يمثل معلومات المنتج في الصفحة
    $('[data-product-info]').each(function() {
        // اجلب سعر القطعة الواحدة من حاصية الموافقة
        var pricePerUnit = $(this).attr('data-product-price');
        // اجلب كمية المنتج من حقل اختيار الكمية
        var quantity = $(this).find('[data-product-quantity]').val();

        var totalPriceForProduct = pricePerUnit * quantity;
        // اضف السعر الاجمالي لهذا المنتج الى السعر الاجمالي لكل المنتجات , واحفظ قيمة المتغير نفسه
        totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        // حدث السعر الاجمالي لكل المنتجات
        $('#total-price-for-all-product').text(totalPriceForAllProducts + '$');
    });
}
var citiesByCountry = {
    sa: ['الرياض', 'جدة'],
    eg: ['القاهرة', 'الإسكندرية'],
    jo: ['عمان', 'الزرقاء'],
    sy: ['دمشق', 'حلب', 'حماه']
};
//عندما يتغير البلد
$('#form-checkout select[name="country"]').on("change", function() {
    //اجلب رمز البلد
    var country = $(this).val();
    //اجلب مدن هذا البلد من المصفوفة
    var cities = citiesByCountry[country];
    //فرع قائمة المدن
    $('#form-checkout select[name="city"]').empty();
    //اضافة خيار اختر المدينة
    $('#form-checkout select[name="city"]').append(
        '<option disabled selected value="">اختر المدينة</option>'
    );
    //اضف المدن الى قائمة المدن
    cities.forEach(function(city) {
        var newOption = $('<option></option>');
        newOption.text(city);
        newOption.val(city);
        $('#form-checkout select[name="city"]').append(newOption);
    });
});
//  عنما تتغير طريقة الدفع 
$('#form-checkout input[name="pay_methode"]').change(function() {
    $('#form-checkout input[name="pay_methode"]').change(function() {
        //اجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivary') {
            //اذا كانت عند الاستلام فعطل حقول بطاقة الائتمان
            $('#credit-card-info input').prop('disabled', true);
        } else {
            // والا فعلها
            $('#credit-card-info input').prop('disabled ', false);
        }
        //  بدل معلومات بطاقة الائتمان بين الظهور والاخفاء$('#credit-card-info').toggle;
        $('#credit-card-info').toggle();
    });
});
// مكون البحث عن السعر
$("#price-range").slider({
    range: true,
    min: 20,
    max: 700,
    step: 20,
    value: [20, 700],
    slide: function(event, ui) {
        $("#price-min").text(ui.values[0]);
        $("#price-max").text(ui.values[1]);
    }
})