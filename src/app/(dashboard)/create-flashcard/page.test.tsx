import { render, screen } from "@testing-library/react"
import CreateFlashcard from "./page"
import { getDecks } from "@/actions/actions"

jest.mock("@/actions/actions")

const mockUseSearchParams = jest.fn()
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: () => mockUseSearchParams(),
}))

describe(CreateFlashcard.name, () => {
  const testDecks = [
    { id: "1", name: "deck 1", userId: "some-id", cardCount: 0 },
  ]
  it("renders", async () => {
    jest.mocked(getDecks).mockResolvedValue(testDecks)
    mockUseSearchParams.mockReturnValue(new URLSearchParams())
    render(await CreateFlashcard())

    expect(screen.getByLabelText("Front")).toBeInTheDocument()
    expect(screen.getByLabelText("Back")).toBeInTheDocument()
    expect(screen.getByLabelText("Deck")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument()
  })

  it("renders with deck 1 selected when deckId=1 is in query params", async () => {
    jest.mocked(getDecks).mockResolvedValue(testDecks)
    mockUseSearchParams.mockReturnValue(new URLSearchParams("deckId=1"))
    render(await CreateFlashcard())

    expect(screen.getByLabelText("Deck")).toHaveTextContent("deck 1")
  })

  it("continues to show placeholder text if deckId form query params is not in deck list", async () => {
    jest.mocked(getDecks).mockResolvedValue(testDecks)
    mockUseSearchParams.mockReturnValue(new URLSearchParams("deckId=bad-id"))
    render(await CreateFlashcard())

    expect(screen.getByLabelText("Deck")).toHaveTextContent("Select a deck")
  })
})
