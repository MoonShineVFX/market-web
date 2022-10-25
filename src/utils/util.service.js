import util from './util';

const Service = {
    // common
    common: (reqData) => util.serviceProxy('/common', reqData),
    langs: (reqData) => util.serviceProxy('/lang_configs', reqData),

    home: (reqData) => util.serviceProxy(`/index?lang=${reqData}`),
    aboutUs: (reqData) => util.serviceProxy({
        method: 'get',
        url: `/about_us?lang=${reqData}`,
    }),
    tutorial: (reqData) => util.serviceProxy(`/tutorials?lang=${reqData}`),
    privacy: (reqData) => util.serviceProxy(`/privacy?lang=${reqData}`),

    // 商品
    productList: (reqData) => util.serviceProxy({
        method: 'get',
        url: `/products?page=${reqData.page}&lang=${reqData.locale}`,
    }),
    productDetail: (reqData) => util.serviceProxy({
        method: 'get',
        url: `/products/${reqData.id}?lang=${reqData.locale}`,
    }),

    // 未登入 (註冊、登入、忘記密碼、重設密碼)
    signin: ({ reqData, headers }) => util.serviceProxy('/login', reqData, {
        headers: { ...headers },
    }),
    register: (reqData) => util.serviceProxy('/register', reqData),
    forgotPassword: (reqData) => util.serviceProxy('/forget_password', reqData),
    resetPassword: (reqData) => util.serviceProxy('/reset_password', reqData),
    activeAccount: (reqData) => util.serviceProxy({
        method: 'get',
        url: `/active_account?uid=${reqData.uid}&token=${reqData.token}`,
    }),

    // 第三方註冊/登入
    signWithGoogle: (reqData) => util.serviceProxy('/google_login', reqData),

    // 購物車
    cartList: (reqData) => util.serviceProxy(`/cart_products?lang=${reqData}`),
    cartAdd: (reqData) => util.serviceProxy('/cart_product_add', reqData),
    cartRemove: (reqData) => util.serviceProxy('/cart_product_remove', reqData),

    // 付款
    order: (reqData) => util.serviceProxy('/order_create', reqData),

    // 訂單記錄
    orderRecord: (reqData) => util.serviceProxy('/orders', reqData),

    // 帳戶資訊
    myProduct: (reqData) => util.serviceProxy(`/my_products?lang=${reqData}`),
    myAccount: (reqData) => util.serviceProxy('/my_account', reqData),
    updateMyAccount: (reqData) => util.serviceProxy('/account_update', reqData),
    changePassword: (reqData) => util.serviceProxy('/change_password', reqData),

    // 取得下載連結
    donwloadLink: (reqData) => util.serviceProxy('/model_download_link', reqData),
};

export default Service;
