import "./index.css";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PhotoGrid } from "./components/PhotoGrid";
import { VStack } from "@chakra-ui/react";

function App() {
  const [originalPhotoPublicId, setOriginalPhotoPublicId] = useState<
    string | null
  >(null);
  const [backdrops, setBackdrops] = useState<string[]>([]);

  useEffect(() => {
    const fetchBackdrops = async () => {
      const response = await fetch("/api/getBackdrops");
      const data = await response.json();
      setBackdrops(data.backdrops);
    };
    fetchBackdrops();
  }, []);

  return (
    <VStack width={"100vw"}>
      <Header
        onUpload={(publicId) => {
          setOriginalPhotoPublicId(publicId);
        }}
      />
      <PhotoGrid
        originalPhotoPublicId={originalPhotoPublicId}
        backdrops={backdrops}
      />
    </VStack>
  );
}

export default App;
