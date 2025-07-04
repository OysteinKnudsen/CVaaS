import React from "react"
import { LuX } from "react-icons/lu"
import { FileUpload, Float } from "@chakra-ui/react"

interface Props {
    file: File
}

export const FilePreview: React.FC<Props> = (props) => {
    return (
    <FileUpload.Item
    w="auto"
    boxSize="20"
    p="2"
    file={props.file}
    >
    <FileUpload.ItemPreviewImage />
    <Float placement="top-end">
    <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
        <LuX />
    </FileUpload.ItemDeleteTrigger>
    </Float>
    </FileUpload.Item>
    )
}

