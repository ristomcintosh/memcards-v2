"use client"
import { createFlashcard } from "@/actions/actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Flashcard, Deck } from "@/types"
import { useSearchParams } from "next/navigation"

import { useForm } from "react-hook-form"

type CreateFlashcardFormValues = Pick<Flashcard, "deckId" | "front" | "back">

type CreateFlashcardFormProps = {
  decks: Deck[]
}
export const CreateFlashcardForm = ({ decks }: CreateFlashcardFormProps) => {
  const queryParam = useSearchParams()
  const defaultDeckId = getDeckIdFromQueryParam(queryParam.get("deckId"), decks)

  const form = useForm<CreateFlashcardFormValues>({
    defaultValues: {
      deckId: defaultDeckId,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    createFlashcard(values)
    form.reset({ deckId: values.deckId, front: "", back: "" })
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="deckId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deck</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a deck" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {decks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id}>
                      {deck.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="front"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Front</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="back"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Back</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}

function getDeckIdFromQueryParam(deckId: string | null, decks: Deck[]) {
  return deckId ? decks.find((deck) => deck.id === deckId)?.id : ""
}
