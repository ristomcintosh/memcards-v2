"use client"
import { login, CreateAccountPayload } from "@/actions/auth"
import { CreateUserSchema } from "@/actions/auth.schma"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CircleAlert } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export default function LoginPage() {
  const form = useForm<CreateAccountPayload>({
    resolver: zodResolver(CreateUserSchema),
    reValidateMode: "onBlur",
    shouldFocusError: false,
  })

  const [formMessage, setFormMessage] = useState("")

  const handleSubmit = (event: CreateAccountPayload) => {
    login(event).then((result) => {
      form.setError("password", { message: result.message })
      setFormMessage(result.message)
    })
  }

  const handleInvalid: SubmitErrorHandler<CreateAccountPayload> = (
    fieldErrors
  ) => {
    const invalidFieldsCount = Object.keys(fieldErrors).length
    setFormMessage(
      `Failed to save because of ${invalidFieldsCount} invalid field(s).`
    )
  }

  return (
    <main className="flex items-center justify-center h-full border-l-8 border-brand-500 border-t-8">
      <div className="w-full sm:max-w-lg p-14 bg-zinc-50 dark:bg-zinc-600 sm:shadow-lg sm:rounded-xl h-full sm:h-auto">
        <div className="mb-8">
          <h1 className="text-4xl mb-4">Sign up</h1>
          <p className="flex flex-wrap gap-x-1">
            <span>Have a Memcards account?</span>
            <Link href="/login">Log in</Link>
          </p>
        </div>
        <p aria-live="assertive" className="sr-only">
          {formMessage}
        </p>
        {formMessage && (
          <div className="mb-4 bg-zinc-500 p-2 rounded flex gap-x-2 items-center">
            <CircleAlert />
            <p aria-hidden="true">{formMessage}</p>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, handleInvalid)}>
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormDescription>
                    Must be at least 8 characters long, contain at least one
                    letter and one number
                  </FormDescription>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-7" size="lg" type="submit">
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}