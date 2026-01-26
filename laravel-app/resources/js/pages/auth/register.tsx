import { Form, Head } from '@inertiajs/react';
import { ArrowDownRight} from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <AuthCardLayout
            title="Daftar Akun Baru"
            description="Buat akun baru untuk masuk ke Electa"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="username"
                                    placeholder="Username"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Nama Lengkap</Label>
                                <Input
                                    id="full_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={2}
                                    autoComplete="name"
                                    name="full_name"
                                    placeholder="Nama Lengkap"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Konfirmasi password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="group flex w-full shrink-0 items-center gap-2">
                                {/* Left Separator: Gray to Rose */}
                                <div className="h-px w-full bg-linear-to-r from-gray-800 via-rose-500 via-20% to-orange-400" />

                                <span className="shrink-0 cursor-default text-xs text-neutral-50">
                                    Atau login dengan
                                </span>

                                {/* Right Separator: Purple to Orange */}
                                <div className="h-px w-full bg-linear-to-r from-orange-400 via-rose-500 to-gray-800" />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant={'outline'}
                                    className="transition-all"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button
                                    variant={'outline'}
                                    className="text-black transition-all dark:text-neutral-50"
                                >
                                    <svg
                                        height="20"
                                        width="20"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                    </svg>
                                    GitHub
                                </Button>
                            </div>

                            <Button
                                type="submit"
                                className="group mt-2 w-full items-center bg-linear-to-tr from-gray-800 via-rose-500 via-20% via-50% to-orange-400 font-black text-neutral-50 shadow-[0px_0px_8px_rgba(255,255,255,0.2)] transition-all ease-out hover:shadow-[0px_0px_8px_rgba(255,255,255,0.25)]"
                                tabIndex={6}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Buat Akun{' '}
                                {!processing && (
                                    <ArrowDownRight className="size-5 transition-all group-hover:translate-x-1 group-hover:-rotate-45" />
                                )}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Sudah punya akun?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={7}
                                className="bg-linear-to-r from-gray-800 via-rose-500 via-20% to-orange-400 bg-clip-text text-transparent!"
                            >
                                Login
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthCardLayout>
    );
}
