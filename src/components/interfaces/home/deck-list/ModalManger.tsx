import { useCallback, useState } from "react";
import type { DeckWithCardCount } from "@/types";
import { DeleteConfirmation } from "../delete-confirmation/DeleteConfirmation";
import { RenameDeckForm } from "../rename-deck-form/RenameDeckForm";

export type ModalType = "rename" | "delete" | null;

export function useModalState() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const closeModal = useCallback(() => setModalType(null), []);

  const [selectedDeck, setSelectedDeck] = useState<DeckWithCardCount | null>(
    null,
  );

  const toggleModal = useCallback(
    (deck: DeckWithCardCount, type: ModalType) => {
      setSelectedDeck(deck);
      setModalType(type);
    },
    [],
  );

  return { modalType, closeModal, selectedDeck, toggleModal };
}

type ModalManagerProps = {
  modalType: ModalType;
  deck: DeckWithCardCount | null;
  closeModal: () => void;
};

export const ModalManager = ({
  modalType,
  closeModal,
  deck,
}: ModalManagerProps) => {
  if (!deck) return null;

  switch (modalType) {
    case "rename":
      return <RenameDeckForm deck={deck} closeForm={() => closeModal()} />;
    case "delete":
      return (
        <DeleteConfirmation deck={deck} handleClose={() => closeModal()} />
      );
    default:
      return null;
  }
};
