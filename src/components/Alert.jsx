import {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const Alert = ({ cancelRef, onClose, m }) => {
  return (
    <>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Movie Not Found
          </AlertDialogHeader>

          <AlertDialogBody>{m}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} colorScheme="green" onClick={onClose}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </>
  );
};

export default Alert;
