import Home from "../page"
import { act, render, screen } from "@testing-library/react"

// Maybe someday they'll come up with a way to test server components
describe.skip(Home.name, () => {
  it("renders", async () => {
    render(<Home />)

    expect(screen.getByText("Deck 1")).toBeInTheDocument()
    expect(screen.getByTestId("deck-card-count")).toHaveTextContent("25")
    expect(
      screen.getByLabelText("Create a new deck or new flashcard")
    ).toBeInTheDocument()
    expect(screen.getByLabelText("Deck menu")).toBeInTheDocument()
  })

  it("shows the create deck form ", () => {
    render(<Home />)

    const createButton = screen.getByLabelText(
      "Create a new deck or new flashcard"
    )

    act(() => {
      createButton.click()
    })

    const createNewDeckButton = screen.getByText("Create Deck")

    act(() => {
      createNewDeckButton.click()
    })

    expect(screen.getByText("Create A New Deck")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })

  it("hides the create deck form when the cancel button is clicked", () => {
    render(<Home />)

    const createButton = screen.getByLabelText(
      "Create a new deck or new flashcard"
    )

    act(() => {
      createButton.click()
    })

    const createNewDeckButton = screen.getByText("Create Deck")

    act(() => {
      createNewDeckButton.click()
    })

    const cancelButton = screen.getByRole("button", { name: "Cancel" })

    act(() => {
      cancelButton.click()
    })

    expect(screen.queryByText("Create a new deck")).not.toBeInTheDocument()
  })
})
