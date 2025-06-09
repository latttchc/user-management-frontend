'use client'
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";

import apiRouter from "@/api/router"

import { Button } from "@/components/ui/button";

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
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            <Link className="text-white text-bold" href={`/users/${user.id}`}>
              {user.name}
            </Link>
            <span>{user.email}</span>
            <Button onClick={() => deleteMutation.mutate(user)}>
              DELETE
            </Button>
          </li>
        ))}
      </ul>
      <Link href={'users/new'}>
        CREATE
      </Link>
    </main>
  );
}
