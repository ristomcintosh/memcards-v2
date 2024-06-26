import { DeckWithFlashcards } from "@/types"
import { Flashcard } from "@/types"

export const flashcards: Flashcard[] = [
  {
    id: "some-id",
    deckId: "some-id",
    front: "What is the capital of France?",
    back: "Paris",
  },
  {
    id: "some-id-2",
    deckId: "some-id-2",
    front: "What is the capital of Portugal?",
    back: "Lisbon",
  },
  {
    id: "some-id-3",
    deckId: "some-id",
    front: "What is the capital of Germany?",
    back: "Berlin",
  },
  {
    id: "some-id-4",
    deckId: "some-id",
    front: "What is the capital of Italy?",
    back: "Rome",
  },
]

export const decks: DeckWithFlashcards[] = [
  {
    id: "1",
    name: "Deck 1",
    flashcards,
  },
  {
    id: "2",
    name: "Deck 2",
    flashcards,
  },
]
