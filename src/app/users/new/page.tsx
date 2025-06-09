'use client'
// import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import apiRouter from "@/api/router"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


// const defaultState = {
//     name: '',
//     email: '',
// }

const formSchema = z.object({
    name: z.string().min(1, "名前は必須です").max(15, "名前は50文字以内で入力してください"),
    email: z.string().email("有効なメールアドレスにしてください")
})

type FormValues = z.infer<typeof formSchema>

export default function createUser() {
    // const [state, setState] = useState(defaultState)
    // const { name, email } = state

    const router = useRouter()
    const queryClient = useQueryClient()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
        }
    })

    const createMuttation = useMutation({
        mutationFn: apiRouter.users.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUsers'] })
            router.push('/')
        },
    })

    const onSubmit = (value: FormValues) => {
        createMuttation.mutate({
            ...value
        })
    }

    return (
        <main className="flex flex-col min-h-screen gap-4 items-center p-24">
            <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>名前</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="名前"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>メールアドレス</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="example@email.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={createMuttation.isPending}
                    >
                        {createMuttation.isPending ? 'SAVE NOW...' : 'SAVE'}
                    </Button>
                </form>
            </Form>
        </main>
        // <main className="flex flex-col min-h-screen gap-4 items-center p-24">
        //     <h4></h4>
        //     <form className="flex flex-col justify-center w-72">
        //         <div className="flex flex-col">
        //             <label>Name</label>
        //             <input type="text" value={name} onChange={(e) => setState((prevState) => ({
        //                 ...prevState,
        //                 name: e.target.value,
        //             }))} />
        //         </div>
        //         <div className="flex flex-col">
        //             <label>Email</label>
        //             <input type="text" value={email} onChange={(e) => setState((prevState) => ({
        //                 ...prevState,
        //                 email: e.target.value,
        //             }))} />
        //         </div>
        //         <Button
        //             onClick={(e) => {
        //                 e.preventDefault()
        //                 createMuttation.mutate({
        //                     name,
        //                     email,
        //                 })
        //             }}>
        //             SAVE
        //         </Button>
        //     </form>
        // </main>
    )
}