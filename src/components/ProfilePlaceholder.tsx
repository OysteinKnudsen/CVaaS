import { Icon } from "@chakra-ui/react"
import { BsPersonBoundingBox } from "react-icons/bs"

export const ProfilePlaceholder = () => {

    return (
        <div
        style={{
          width: 250,
          height: 300,
          borderRadius: "10%",
          background: "#909DA9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon as={BsPersonBoundingBox} boxSize="90%" color="white" />
      </div>
    )
}