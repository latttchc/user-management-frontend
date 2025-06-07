'use client' // Next.js App Routerでクライアントコンポーネントとして指定

import React, { useState } from "react" // Reactと状態管理フックをインポート
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// React Queryのクライアントとプロバイダーをインポート

/**
 * ReactQueryClientProviderコンポーネントのProps型定義
 * @interface ReactQueryClientProviderProps
 */
interface ReactQueryClientProviderProps {
    children: React.ReactNode, // 子コンポーネントを受け取るためのプロパティ
}

export const ReactQueryClientProvider = (props: ReactQueryClientProviderProps) => {
    const { children } = props // propsから子コンポーネントを分割代入で取得

    /**
     * QueryClientのインスタンスを作成
     * useStateを使用してコンポーネントの再レンダリング時に同じインスタンスを保持
     */
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 60 * 1000, // データが古くなるまでの時間を60秒に設定（キャッシュの有効期限）
                },
            },
        })
    )

    // QueryClientProviderで子コンポーネントをラップしてReact Queryの機能を提供
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}