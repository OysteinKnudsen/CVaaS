import { Alert } from "@chakra-ui/react"
import React from "react"

interface Props {
    error: string;
}
export const FileUploadError: React.FC<Props> = (props) => {
    return (
        <Alert.Root status="error">
            <Alert.Title>Feil ved opplasting</Alert.Title>
            <Alert.Description>
                {props.error}
            </Alert.Description>
        </Alert.Root>
    )
}