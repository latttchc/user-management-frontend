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
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      {data?.length === 0 ? (
        <Card>
          <CardContent>
            <h3>ユーザーがいません</h3>
            <p>ユーザを作成してださい</p>
          </CardContent>
          <Button>
            <Link href="user/new">
              Create User
            </Link>
          </Button>
        </Card>) : (
        <div>
          {data?.map((user) => (
            <div>
              <Card key={user.id}>
                <CardContent>
                  <div className="flex flex-col items-center gap-2">
                    <Link
                      href={`users/${user.id}`}
                    >
                      {user.name}
                    </Link>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span>{user.email}</span>
                  </div>
                  <Button
                    onClick={() => deleteMutation.mutate(user)}
                  >
                    {deleteMutation.isPending ? 'DELETE NOW' : 'DELETE'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
          <Button>
            <Link href={'users/new'}>
              CREATE
            </Link>
          </Button>
        </div>
      )
      }
    </main >
    // <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //   <ul>
    //     {data?.map((user) => (
    //       <li key={user.id}>
    //         <Link className="text-white text-bold" href={`/users/${user.id}`}>
    //           {user.name}
    //         </Link>
    //         <span>{user.email}</span>
    //         <Button onClick={() => deleteMutation.mutate(user)}>
    //           DELETE
    //         </Button>
    //       </li>
    //     ))}
    //   </ul>
    //   <Link href={'users/new'}>
    //     CREATE
    //   </Link>
    // </main>
  );
}
