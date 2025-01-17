import { ComponentProps, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { VStack, HStack, Button, Text, Divider } from "@chakra-ui/react";
import { useSecondaryTextColor } from "theme";

import { t } from "utils";

import { useNotImplementedYetToast } from "shared/Toast";

import { CartItem } from "./CartItem";

interface IProps {
  cartProducts: ComponentProps<typeof CartItem>[];
}

const CartsList = ({ cartProducts }: IProps) => {
  const navigate = useNavigate();
  const notImplemented = useNotImplementedYetToast();

  const secondaryColor = useSecondaryTextColor();

  const subtotal = cartProducts
    .map((cart) => cart.price)
    .reduce((a, b) => a + b, 0);

  return (
    <VStack w="100%" spacing={8}>
      {cartProducts.map((cart) => (
        <Fragment key={cart.id}>
          <CartItem {...cart} />
          <Divider />
        </Fragment>
      ))}
      <VStack w="100%" align="start" spacing={1}>
        <HStack
          w="100%"
          align="flex-start"
          justify="space-between"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="semibold"
        >
          <Text>{t("Subtotal")}</Text>
          <Text>${subtotal}</Text>
        </HStack>
        <Text fontSize="sm" color={secondaryColor}>
          {t("Shipping and taxes will be calculated at checkout.")}
        </Text>
      </VStack>
      <VStack w="100%">
        <Button w="100%" colorScheme="orange" onClick={notImplemented}>
          {t("Checkout")}
        </Button>
        <HStack>
          <Text fontSize="sm">{t("or")}</Text>
          <Button
            size="sm"
            variant="link"
            colorScheme="orange"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/products")}
          >
            {t("Continue shopping")}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export { CartsList };
