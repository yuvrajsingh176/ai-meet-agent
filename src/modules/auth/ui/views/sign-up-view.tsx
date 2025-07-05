'use client'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const fromSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' })
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

const SignUpView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
        }
    });



    const onSubmit = (data: z.infer<typeof fromSchema>) => {
        setError(null);
        setPending(true);
        authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            callbackURL: '/'
        },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push('/');
                },
                onError: ({ error }) => {
                    console.log(error)
                    setError(error.message)
                }
            }

        )
        setPending(false);
    }

    const onSocial = (provider: "github" | "google") => {
        setError(null);
        setPending(true);

        authClient.signIn.social({
            provider: provider,
            callbackURL: '/'
        },
            {
                onSuccess: () => {
                    setPending(false);
                },
                onError: ({ error }) => {
                    console.log(error)
                    setError(error.message)
                }
            }

        )
        setPending(false);
    }


    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0  md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6 ">
                                <div className="flex flex-col items-center  text-center ">
                                    <h1 className="text-2xl font-bold">
                                        Let&apos; get you started
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Create Your Account to continue
                                    </p>
                                </div>
                                <div className="grid gap-3 ">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>

                                    </FormField>
                                </div>
                                <div className="grid gap-3 ">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@gmail.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>

                                    </FormField>
                                </div>
                                <div className="grid gap-3 ">
                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>

                                    </FormField>
                                </div>
                                <div className="grid gap-3 ">
                                    <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>

                                    </FormField>
                                </div>
                                {
                                    !!error && (
                                        <Alert className="bg-destructive/10 border-none">
                                            <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                            <AlertTitle>
                                                {error}
                                            </AlertTitle>
                                        </Alert>
                                    )
                                }
                                <Button disabled={pending} type="submit" className="w-full">
                                    Sign Up
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className=" bg-card text-muted-foreground relative z-10 px-2 ">
                                        or continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 ">
                                    <Button onClick={() => onSocial("google")} disabled={pending} variant="outline" className="w-full h-fit" type="button">
                                        <Image alt='google' src='/google.svg' height={30} width={40} />
                                    </Button>
                                    <Button onClick={() => onSocial("github")} disabled={pending} variant="outline" className="w-full h-fit" type="button">
                                        <Image alt='github' src='/github.svg' height={30} width={40} />
                                    </Button>

                                </div>
                                <div className="text-center text-sm ">
                                    Don&apos;t have an account?
                                    <Link href='/sign-up' className="underline underline-offset-4">
                                        {" "}Sign Up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="bg-radial  from-orange-300  to-orange-600 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <Image src='/logo.svg' alt="logo" height={92} width={92} className=" h-[92px]  w-[92px]" />
                        <p className="text-2xl font-semibold  text-white ">
                            Meet.AI
                        </p>
                    </div>

                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#" className="underline">Terms of service</a>
            </div>
        </div>
    )
}

export default SignUpView