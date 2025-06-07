import userEndpoints from './user' // ユーザー関連のAPIエンドポイントをインポート

/**
 * APIルーターの中央集約管理
 * 各機能別のエンドポイントを統合して、アプリケーション全体で使用する
 * APIの呼び出し口を一元化することで、保守性とスケーラビリティを向上
 */
const endpoint = {
    users: userEndpoints, // ユーザー関連のエンドポイント群を統合
    // 将来的に他の機能を追加する場合:
    // posts: postEndpoints,     // 投稿関連
    // auth: authEndpoints,      // 認証関連
    // admin: adminEndpoints,    // 管理者関連
}

/**
 * 統合されたAPIエンドポイントをデフォルトエクスポート
 * 
 * // ユーザー一覧取得
 * const users = await endpoint.users.getUser();
 * 
 * // 将来的な使用例:
 * // const posts = await endpoint.posts.getPosts();
 * // const loginResult = await endpoint.auth.login(credentials);
 */
export default endpoint

