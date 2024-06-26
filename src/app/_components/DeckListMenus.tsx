"use client"
import { DeckWithCardCount } from "@/types"
import Link from "next/link"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VerticalDots } from "@/components/VerticalDots"
import { Rename, Delete } from "../../components/menu-items"

type MenuProps = {
  handleRename: () => void
  handleDelete: () => void
}

export const DeckMenu = ({ handleRename, handleDelete }: MenuProps) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger
      aria-label="Deck Options"
      className="w-8 h-8 p-1 hover:bg-zinc-300 hover:rounded-full"
    >
      <VerticalDots />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onSelect={() => handleRename()}>
        <Rename />
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => handleDelete()}>
        <Delete />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export const LinkWithContextMenu = ({
  deck,
  handleDelete,
  handleRename,
}: { deck: DeckWithCardCount } & MenuProps) => {
  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <div className="flex-grow flex justify-between">
          <Link className="flex-grow" href={`/study/${deck.id}`}>
            {deck.name}
          </Link>
          <p aria-label={`card count ${deck.cardCount}`}>{deck.cardCount}</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem onSelect={() => handleRename()}>
            <Rename />
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => handleDelete()}>
            <Delete />
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
