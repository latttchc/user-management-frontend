import api from "."; // 汎用API関数をインポート

type Endpoint = {
    getUsers: () => Promise<APIschema.User[]>,
    getUser: (userId: number) => Promise<APIschema.User>,
    createUser: (user: Partial<APIschema.User>) => Promise<APIschema.User[]>,
    updateUser: (user: Partial<APIschema.User>) => Promise<APIschema.User[]>,
    deleteUser: (user: Partial<APIschema.User>) => Promise<APIschema.User[]>,
}

/**せつ
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
     * JSON.stringfy : object => JSON文字列
     * JSON.parse : JSON文字列 => object
     */
    getUsers: async () => {
        return await api('users') // 'users'エンドポイントにGETリクエストを送信
    },
    getUser: async (userId) => {
        return await api(`users/${userId}`)
    },
    createUser: async (user: Partial<APIschema.User>) => {
        return await api('users', {
            method: "post",
            data: JSON.stringify({
                user,
            })
        })
    },
    updateUser: async (user: Partial<APIschema.User>) => {
        return await api(`users/${user.id}`, {
            method: 'put',
            data: JSON.stringify({
                user,
            })
        })
    },
    deleteUser: async (user: Partial<APIschema.User>) => {
        return await api(`users/${user.id}`, {
            method: 'delete',
        })
    },
}

// ユーザーエンドポイントオブジェクトをデフォルトエクスポート
export default endpoint