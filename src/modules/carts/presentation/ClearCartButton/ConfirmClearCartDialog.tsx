/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useRef } from "react";

import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useSecondaryTextColor } from "theme";

import { t } from "utils";

import { createModalStore } from "shared/Modal";

import { useClearCart } from "modules/carts/infrastructure";

import { useClearCartNotifications } from "./useClearCartNotifications";

export const useConfirmClearCartDialogStore = createModalStore<string>();

const ConfirmClearCartDialog = () => {
  const cancelRef = useRef();
  const secondaryColor = useSecondaryTextColor();
  const [clear, isLoading] = useClearCart();
  const { isOpen, onClose, cartId } = useConfirmClearCartDialogStore(
    (state) => ({
      isOpen: state.isOpen,
      onClose: state.onClose,
      cartId: state.selectedItem,
    })
  );
  const [notifySuccess, notifyFailure] = useClearCartNotifications();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as any}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("Clear cart")}
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack align="stretch">
              <Text>
                {t("Are you sure? You can't undo this action afterwards.")}
              </Text>
              <Text fontSize="xs" color={secondaryColor}>
                {t(
                  "(because this app uses a fake API, this delete request will be mocked and won't affect the cart)"
                )}
              </Text>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef as any} onClick={onClose}>
              {t("Cancel")}
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                try {
                  await clear(cartId!);
                  notifySuccess();
                } catch {
                  notifyFailure();
                } finally {
                  onClose();
                }
              }}
              isLoading={isLoading}
              ml={3}
            >
              {t("Confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export { ConfirmClearCartDialog };
