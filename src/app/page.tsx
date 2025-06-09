'use client'
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";

import apiRouter from "@/api/router"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { data, refetch } = useQuery({
    queryKey: ['getUsers'],
    queryFn: apiRouter.users.getUsers,
  })

  const deleteMutation = useMutation({
    mutationFn: apiRouter.users.deleteUser,
    onSuccess: () => refetch(),
  })

  return (
    <main className="flex flex-col gap-4 min-h-screen items-center p-24">
      <div className="items-center max-w-4xl mx-auto">
        {data?.length === 0 ? (
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="py-16 px-8 text-center">
              <div className="mb-6">
                <h3>ユーザーがいません</h3>
                <p>ユーザを作成してださい</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                <Link href="/users/new">
                  Create User
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="w-96 flex flex-col items-center">
            <h1 className="text-bold text-amber-600 text-4xl mb-5">USER MANEGEMENT</h1>
            {data?.map((user) => (
              <Card className="flex border-b border-gray-800 w-96 m-3" key={user.id}>
                <CardContent>
                  <div className="flex justify-between">
                    <div className="py-3">
                      <Link
                        href={`/users/${user.id}`}
                        className="block text-lg font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        {user.name}
                      </Link>
                    </div>
                    <div className="flex flex-col justify-center  gap-2 text-gray-600">
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div>
                      <Button
                        onClick={() => deleteMutation.mutate(user)}
                        disabled={deleteMutation.isPending}
                        className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleteMutation.isPending ? 'DELETE NOW' : 'DELETE'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="mt-8 flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg font-medium">
                <Link href="/users/new">
                  CREATE USER
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
