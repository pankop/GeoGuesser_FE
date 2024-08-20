import ImageUpload from "./components/ImageUpload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold mb-6">Welcome to GeoGuesser</h1>
      <p className="text-gray-700 mb-8 text-center">
        Upload an image to start guessing the location.
      </p>
      <ImageUpload />
    </main>
  );
}
