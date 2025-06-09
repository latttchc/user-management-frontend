/**
 * 環境別APIベースURL設定
 * 各環境に対応するAPIサーバーのベースURLを定義
 */
const baseURLs = {
    development: 'http://localhost:3002/v1/',  // 開発環境: ローカル開発サーバー（ポート3002、APIバージョンv1）
    staging: '',      // ステージング環境: テスト用サーバー（未設定）
    production: '',   // 本番環境: 本番サーバー（未設定）
    test: '',         // テスト環境: テスト実行時のモックサーバー（未設定）
}

/**
 * 現在の環境に応じたベースURLを取得
 * process.env.NODE_ENVの値に基づいて適切なAPIエンドポイントを選択
 * 環境変数が未設定の場合はdevelopmentをデフォルトとして使用
 */
const baseURL = baseURLs[process.env.NODE_ENV || 'development']

// 選択されたベースURLをデフォルトエクスポートとして公開
export default baseURL