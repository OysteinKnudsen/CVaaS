import "./index.css";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PhotoGrid } from "./components/PhotoGrid";

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
    <>
      <Header
        onUpload={(publicId) => {
          setOriginalPhotoPublicId(publicId);
        }}
      />
      <PhotoGrid
        originalPhotoPublicId={originalPhotoPublicId}
        backdrops={backdrops}
      />
    </>
  );
}

export default App;
