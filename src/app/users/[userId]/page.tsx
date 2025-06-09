'use client'
import { useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
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

const formSchema = z.object({
    name: z.string().min(1, "名前は必須です").max(15, "名前は50文字以内で入力してください"),
    email: z.string().email("有効なメールアドレスにしてください")
})

type FormValues = z.infer<typeof formSchema>


export default function EditUser(props: any) {
    const { params: { userId } } = props
    const router = useRouter()
    const queryClient = useQueryClient()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    })

    // const [state, setState] = useState(defaultState)
    // const { name, email } = state

    const { data, isLoading, status } = useQuery({
        queryKey: ['getUsers', userId],
        queryFn: () => apiRouter.users.getUser(userId),
    })

    useEffect(() => {
        if (status === 'success')
            form.reset({
                name: data?.name || '',
                email: data?.email || '',
            })
    }, [status, data, form])

    const updateMuttation = useMutation({
        mutationFn: apiRouter.users.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUsers'] })
            router.push('/')
        }
    })

    const onSubmit = (values: FormValues) => {
        updateMuttation.mutate({
            id: Number(userId),
            ...values,
        })
    }

    return (
        <main className="flex flex-col min-h-screen gap-4 items-center p-24">
            <h4>{data?.name}</h4>
            <Form {...form}>
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
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="pt-2">メールアドレス</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="example@email.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="bg-green-500 hover:bg-green-800 w-64 mt-3"
                        type="submit"
                        disabled={updateMuttation.isPending}
                    >
                        {updateMuttation.isPending ? 'SAVE NOW...' : 'SAVE'}
                    </Button>
                </form>
            </Form>
            {/* {!isLoading && (
                <form className="flex flex-col justify-center w-72">
                    <div className="flex flex-col">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setState((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                        }))} />
                    </div>
                    <div className="flex flex-col">
                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setState((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                        }))} />
                    </div>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        updateMuttation.mutate({
                            id: data?.id,
                            name,
                            email,
                        })
                    }}>
                        SAVE
                    </Button>
                </form>
            )
            } */}

        </main>
    )
}