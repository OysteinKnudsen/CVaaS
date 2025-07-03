/**
 * Button to allow user to upload photos to Cloudinary. 
 * The button should use the API endpoint to upload the photo to Cloudinary.
 * The button should handle two cases: 
 * - uploading a original CV photo 
 * - uploading a backdrop photo
 * The button should have a loading state and an error state.
 * The button should return the public ID of the uploaded photo.
 * The button text should be "Last opp orginalbilde" or "Last opp bakgrunn" depending on the case.
 */

import { Button, Icon } from "@chakra-ui/react";
import type React from "react";
import { useState } from "react";
import { RiUpload2Line } from "react-icons/ri";

interface Props {
    type: "original" | "backdrop";
    onUpload: (publicId: string) => void;
}

export const UploadPhotoButton: React.FC<Props> = (props) => {

    const buttonText = props.type === "original" ? "Last opp orginalbilde" : "Last opp bakgrunn";
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        setIsUploading(true);
        setIsUploading(false);
        props.onUpload("test");
    }

    return (
        <Button isLoading={isUploading} onClick={handleUpload}>
            <Icon m={2} as={RiUpload2Line} />
            {buttonText}
        </Button>
    )
}