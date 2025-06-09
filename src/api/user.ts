import api from "."; // 汎用API関数をインポート

type Endpoint = {
    getUser: () => Promise<APIschema.User[]>
}

/**
 * ユーザー関連のAPIエンドポイント定義
 * ユーザー情報の取得、作成、更新、削除に関する機能を提供
 */
const endpoint: Endpoint = {
    /**
     * 全ユーザー情報を取得する
     * GETリクエストでユーザー一覧を取得
     * 
     * const users = await endpoint.getUser();
     * console.log(users); // ユーザー一覧が表示される
     */
    getUser: async () => {
        return await api('users') // 'users'エンドポイントにGETリクエストを送信
    }
}

// ユーザーエンドポイントオブジェクトをデフォルトエクスポート
export default endpoint