export default {
    syncUpdate: {
        appUpdate: 'アプリ更新',
        continue: '次へ',
        install: 'インストール',
        ignore: 'スキップ',
        upToDate: '最新バージョン',
        updateTitle: '利用可能なアップデート',
        mandatoryUpdateMessage: 'アップデートをインストールするには確認が必要です：',
        optionalUpdateMessage: 'アップデート利用可能：',
        downloadingPackage: 'パッケージのダウンロード。。。',
        installingUpdate: 'インストールされている。。。',
        updateInstalled: 'インストールされました！',
    },
    common: {
        defaultLanguage: 'English',
        close: '閉じる',
        noText: 'テキストなし',
        noData: 'データなし',
        cancel: 'キャンセル',
        confirm: '決定',
        save: '保存',
        next: '次へ',
        sendOTP: {
            title: '認証コード',
            titleForgotPassword: 'パスワードを忘れた',
            sendForgotPassword: '確認',
            backButton: '前の画面',
            descriptionNext:
                '入力したメールアドレスに通知メールを送信しました。\n 認証コードを入力し、「次へ」ボタンを押してください。有効期限は24時間です。',
            descriptionConfirm:
                '入力したメールアドレスに通知メールを送信しました。\n 認証コードを入力し、「確認」ボタンを押してください。有効期限は24時間です。',
            description:
                '入力したメールアドレスに通知メールを送信しました。\n 認証コードを入力し、「登録」ボタンを押してください。有効期限は24時間です。',
            resend: '再送信',
            buttonSend: '登録',
            buttonNext: '次へ',
        },
        picker: {
            pickItem: 'アイテムを選択してください',
        },
        error: {
            unknown: '不明なエラーが発生しました。',
            network: 'エラーが発生しました。暫くしてから、もう一度試してください。',
        },
        yes: 'はい',
        email: 'メールアドレス',
        name: '名前',
        birthday: '生年月日',
        gender: '性別',
        changePass: 'パスワード変更',
        cancelCamera: 'キャンセル',
        chooseCamera: '選択',
        chooseImgTitle: '写真を選択',
        optionCamera: '写真を撮る',
        optionFolder: 'フォトライブラリ',
        menuNoData: '商品がありません。',
    },

    // screens
    tab: {
        home: 'ホーム',
        stamp: 'スタンプ',
        order: '注文',
        coupon: 'クーポン',
        setting: 'マイページ',
        account: 'アカウント',
        notification: '通知',
    },
    authen: {
        login: {
            label: {
                email: 'メールアドレス',
                password: 'パスワード',
            },
            placeholderEmail: 'メールを入力してください',
            placeholderPassword: 'パスワード',
            buttonLogin: 'ログイン',
            rememberText: 'ログイン状態を保持',
            forgotPasswordText: 'パスワードを忘れた方',
            registerText: '新規登録',
            noAccountText: 'アカウントを持っていない方？',
        },
        register: {
            title: '新規登録',
            emailPlaceholder: 'sample@demo.webcom',
            namePlaceholder: 'name',
            birthdayPlaceholder: 'birthday',
            password: 'パスワード',
            passwordPlaceholder: 'パスワード',
            passwordConfirm: 'パスワード（再入力）',
            backButton: '前の画面',
            photo: '画像',
            camera: 'カメラ',
            cancel: 'キャンセル',
            note: 'アカウントを持っている方？',
            login: 'ログイン',
            skipOrderDefault: 'スキップ',
            male: '男性',
            female: '女性',
            contentOrderDefault:
                'この画面では、自分が普段よく食べる商品を設定することができます。\n設定することで、ホーム画面に表示されるQRコードを店舗券売機にかざすだけで簡単に注文ができるようになります。\n※後でも設定・変更可能です。',
        },
        hintRegister: {
            email: 'メールを入力してください',
            password: 'パスワード',
            confirmPassword: 'パスワード再入力',
            fullName: '名前を入力してください',
            birthday: '年/月/日',
        },
        labelRegister: {
            email: 'メールアドレス',
            password: 'パスワード',
            confirmPassword: 'パスワード再入力',
            fullName: '名前',
            birthday: '生年月日',
            gender: '性別',
        },
        sendEmail: {
            title: 'パスワードを忘れた',
            sendButtonTitle: '次へ',
        },
    },
    home: {
        news: 'ニュース',
        seeAll: '全て見る',
        newsTitle: 'ニュース一覧',
        storeSearch: '店舗検索',
        newsNoData: 'ニュースがありません。',
    },
    account: {},
    notification: {
        notificationTiTle: '通知一覧',
        readAllNotification: 'すべて既読',
        couponList: 'クーポンリスト',
        detailNotificationTitle: '通知',
        rangeDate: '{{start}} ~ {{end}}',
        stampList: 'スタンプリスト',
        noData: '現在、通知がありません',
    },
    order: {
        menuTitle: 'メニュー',
        changeCart: 'カートに 5商品追加 （注文数：11/10商品）',
        couponTitle: 'クーポンリスト',
        useCoupon: 'クーポン使用',
        applyCoupon: 'クーポンの商品を選択',
        keep: '保存',
        orderGuide: '注文ガイド',
        rangeDate: '{{start}} : {{end}}',
        addNew: '新商品を注文する',
        editMenu: '注文した商品を編集する',
        editCouponTitle: '商品編集',
        goToEdit: '商品編集',
        canNotAdd: '最大10つ商品を選択してください',
        rangeCart: 'カートに {{amountValue}}商品追加\n（注文数：{{numOrder}}/{{max}}商品）',
        rangeEditCart: 'カートの変更\n（注文数：{{numOrder}}/{{max}}商品）',
        cartTitle: 'カート',
        cancelOrder: '注文キャンセル',
        numOrder: '注文数',
        numOrderItem: '商品数',
        taste: '品',
        point: '商品',
        quantity: '個数',
        deleteCart: 'すべての注文をキャンセルしますか？',
        errorMaxOrder: 'QRコードには最大10つ商品が発行できます',
        qrButton: 'ＱＲコード発行',
        rangeCartMenu: '(注文数：{{numOrder}}/{{max}}商品）',
        editCartButton: '商品追加',
        couponUse: '適用する商品: {{dish}}',
        allDish: '適用する商品: もりそば',
        require: '必須',
        rangeEditMenu: '{{numOrderCheck}}/{{numOrder}}クーポン選択済み',
        cancelDish: 'この商品を削除してよろしいですか？',
        cancelCoupon: 'このクーポンを削除してよろしいですか？',
        qrGuide: '来店QRコードの詳細',
        cancelOrderDefault: '全てキャンセル',
        editOrderDefault: 'いつもの！注文編集',
        resetOrderDefault: 'リセット',
        resetDefaultOrder: '注文をリセットしてもよろしいでしょうか？',
        backHomeWhenPayment: '注文「{{orderId}}」の支払いが完了しました。更新するにはホーム画面へ戻ってください。',
        rangeTimeHistoryOrder: '合計：￥{{totalPaid}}',
        rangeHistoryTitleItem: '{{amount}}商品: {{title}}',
        subtotal: '小計',
        rangePrice: '￥ {{price}}',
        rangeCouponPrice: '-￥ {{price}}',
        total: '合計',
        rangeSubDish: 'x{{amount}}',
    },
    setting: {
        editProfileTitle: 'マイページ編集',
        editProfile: '保存',
        cancel: 'キャンセル',
        orderHistoryTitle: '注文履歴',
        orderHistoryDetailTitle: '注文詳細',
        timeOrder: '注文日時 : ',
        orderDefaultTitle: 'いつもの！注文',
        viewCart: 'カートを見る',
        orderSaveTitle: 'いつもの！注文',
        position: 'タイトル',
        content: '内容',
        contactTitle: '問い合わせ',
        send: '送信',
        settingNotificationTitle: '通知設定',
        pushNotification: 'プッシュ通知',
        emailNotification: 'メール通知',
    },

    // alert
    alert: {
        success: '新規コードを送りました。',
        invalidOTP: '認証コードは正しくありません。',
    },

    // error
    error: {
        required: 'こちらは必須項目です。',
        signIn: '入力されたイメルまたはパスワードが正しくありません。',
        infoInvalid: '情報は正しくありません。',
        notCompleted: '全ての項目に入力してください。',
        validatePassword: 'パスワードは半角英数字で6文字以上入力する必要があります。',
        passwordMinLength: 'パスワードは8桁以上でご入力ください。',
        passwordMaxLength: 'パスワードは20桁以下でご入力ください。',
        passwordInvalid: 'パスワードは8～20桁の半角文字、半角数字の2種類を組み合わせてください。',
        confirmPasswordInvalid: '確認パスワードは文字以上を入力してください。',
        passwordNotMatch: 'パスワードとパスワード再入力が異なっています。',
        duplicatePassword: 'パスワードは二重されました。',
        emailExisted: 'このメールアドレスは既に使用されています',
        emailInvalid: '正しいメールアドレスの形式をご入力ください。',
        emailEmpty: '全ての項目を入力してください。',
        emailNotExisted: 'このメールアドレスはまだ登録されていません。',
        phoneInvalid: '電話番号は正しくありません。',
        maxFullName: '15文字から8文字までに入力してください。',
        trimSpace: '文頭や文末には空白文字を入力しないでください。',
        messageLength: '1文字以上 255文字以内。',
        require: '{{field}}は記入必須の項目です。',
        maxLength: '8文字以内で入力してください。',
        minLength: '8文字以上で入力してください。',
        inputComponent:
            'You need to wrap input by Form Provider or passing "form = useForm( ... )" into input component.',
        errorSpecialCharacter: '名前には特殊文字を含むことはできません。',
    },
    stamp: {
        title: 'スタンプカード',
        noteUse: '押していないスタンプが{{count}}個あります。\n押す場合はこの欄をタッチ！',
        canUse: '使用可',
        used: '有効期限切れ',
        rangeDate: '{{start}}－{{end}}',
        noExpiredDate: '有効期間 : 無制限',
        titleCount: '獲得数',
        count: '{{count}} 個',
        exchangeStamp: '交換\nカード',
        cumulativeStamp: '累計\nカード',
        guideTitle: 'スタンプカードの詳細',
        noData: '現在、スタンプカードがありません',
        remain: '残数',
        tickSuccess: 'スタンプを貯まりました',
    },
    chooseStamp: {
        earnStamp: '貯まるスタンプを選択',
        orderId: '注文ID: {{stringId}}',
        pleaseChoose: '貯まるスタンプを選択してください',
        tickStampNote: '{{ticked}}/{{total}}貯まるスタンプを選択した',
        tickedNote: '(貯めたスタンプ: {{ticked}}{{total}})',
        btn: '保存',
    },
    stampDetail: {
        title: '新年スタンプカード',
        expired: '有効期限切れ',
        numberOfRemain: '残数',
        numberOfCollect: '獲得数',
        numberOfUse: '使用数',
        count: '{{count}} 個',
        historyExchange: 'クーポン交換履歴',
        couponExchangeBtn: 'クーポン交換',
        couponGetHistory: 'クーポンGET履歴',
        modalGetCoupon: 'クーポンGET',
        dishesApplyAll: 'スタンプ対象商品設定：なし',
        dishesApplyEach: 'スタンプ対象商品設定：',
        note: '注意',
        tickType: 'スタンプの貯め方: {{type}}',
    },
    exchangeCoupon: {
        title: 'クーポン交換',
        listCanExchange: 'クーポン交換できるリスト',
        btnExchange: 'クーポン交換',
        confirm: {
            title: '確認',
            content: 'このクーポンを交換すると、交換可能スタンプ残数が「{{amount}}個」になります。交換しますか？',
            textButtonCancel: 'いいえ',
        },
        success: {
            title: '交換完了',
            content: 'ご希望のクーポンと交換しました。',
            textButtonCancel: 'スタンプカード\nに戻る',
            textButtonOk: '獲得した\nクーポンを見る',
        },
        error: {
            title: '注意',
            content: '交換可能スタンプ残数が足りません。',
        },
    },
    coupon: {
        title: 'クーポンリスト',
        useCoupon: 'クーポン使用',
        canUse: '【リリース記念ＳＣ用】...',
        canNotUse: '新年会クーポン',
        topTab: {
            canUse: '使用可',
            used: '使用済み',
        },
        rangeDate: '{{start}}－{{end}}',
        expiredDate: '有効期限 : {{start}}－{{end}}',
        usedDate: '使用日付 : {{date}}',
        btnUse: 'クーポン選択',
        btnUseTabCoupon: 'クーポン使用',
        btnUnUse: '選択している',
        btnInCart: 'カート追加した',
        btnExpired: '有効期限切れ',
        noExpiredDate: '有効期間 : 無制限',
        detail: {
            id: 'クーポンＩＤ：{{id}}',
            expired: '有効期限切れ',
            getCoupon: '{{count}}つクーポンをGETできます',
            discount: '{{title}} : ￥{{discount}}割引',
            free: '{{title}} : 無料',
            discountAllOrder: '注文全体用のクーポン : ￥{{discount}}割引',
        },
        chooseDish: 'クーポンの適用商品を選択してください',
        moreCoupon: 'クーポン追加',
        noCoupon: 'なし',
        noData: '現在、クーポンがありません',
        couponAmount: '個',
    },
    otp: {
        register: {
            title: '認証',
            titleInputOtp: '認証コードを入力',
            note: '入力していただいたメールアドレス宛に認証コードを送信しました。\n届いた認証コードを入力してください。',
            resendOtp: '認証コード再送信',
            noteResend: '{{countdown}}秒後にもう一度お試しください',
            maxResend: '認証コードは5回連続で再送信しました。まだ問題があれば、もう一度最初からご登録ください。',
            alertInvalidOtpMax: '5回連続でコードを間違って入力したら、再登録してください。',
        },
        resetPassword: {
            title: 'パスワード再発行',
            titleInputOtp: '認証コードを入力',
            note: '入力していただいたメールアドレス宛に認証コードを送信しました。\n届いた認証コードを入力してください。',
        },
        error: {
            otpInvalid: '認証コードが正しくありません.',
        },
    },
    forgotPass: {
        title: 'パスワード再発行',
        email: {
            label: '登録メールアドレス',
            placeholder: '登録メールアドレスを入力してください',
        },
    },
    resetPass: {
        title: 'パスワード再発行',
        passLabel: 'パスワード',
        passPlaceholder: 'パスワード',
        confirmPassLabel: 'パスワード再入力',
        confirmPassPlaceholder: 'パスワード再入力',
        success: 'パスワードが変更しました',
    },
    popup: {
        titleConfirm: '確認',
        titleSuccess: 'おめでとう',
        titleError: 'エラー',
    },
    permissions: {
        camera: 'カメラへのアクセス権限をオフされているようです。スマホの設定でオンにしてください。',
        photo: 'ライブラリーへのアクセス権限をオフされているようです。スマホの設定でオンにしてください。',
    },
    mobileOrder: {
        title: '事前注文QRコード',
        qr: {
            edit: '注文編集',
            cancel: '注文キャンセル',
        },
        coupon: {
            title: 'クーポンリスト',
        },
        cancelOrder: 'すべての注文をキャンセルしますか？',
    },
    qrHome: {
        default: {
            title: 'いつもの！注文',
            button: '注文詳細',
            content1: '”いつもの！注文”がまだ設定されていません。',
            content2: '※設定すると、ホーム画面を開いただけで よく食べる商品の注文が簡単にできるようになります。',
            createButton: '設定',
        },
        mobile: {
            title: '事前注文',
            button: '注文詳細',
            content1: '"事前注文"がまだありません。',
            content2: 'お店に入る前に商品を選んでおくと、 スマホをかざすだけで簡単に注文ができるようになります。',
            createButton: '事前注文',
        },
        checkIn: {
            title: '来店QRコード',
            button: '来店QRコードについて',
        },
    },
    profile: {
        updateSuccess: 'Update Info Success',
    },
};
