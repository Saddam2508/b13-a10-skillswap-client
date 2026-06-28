"use client";
import { Button, Modal } from "@heroui/react";

export function DeleteModal({ task, isOpen, onClose, onConfirm, deleting }) {
  return (
    <Modal isOpen = {isOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
            <Modal.CloseTrigger onClick={onClose} />

            <Modal.Body className="px-6 pt-8 pb-4 flex flex-col items-center gap-3">
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-base">
                  Delete Task?
                </p>
                <p className="text-zinc-400 text-sm mt-1 line-clamp-2">
                  {task?.title} will be permanently removed.
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer className="justify-center gap-3 pb-6">
              <Button
                slot="close"
                variant="secondary"
                onPress={onClose}
                className="text-zinc-400 border border-zinc-700 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onPress={onConfirm}
                isLoading={deleting}
                className="bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium"
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}