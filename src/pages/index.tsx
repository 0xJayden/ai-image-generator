import Image from "next/image";
import { Inter } from "next/font/google";
import { BaseSyntheticEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const generateImage = async (e: BaseSyntheticEvent, prompt: string) => {
    e.preventDefault();
    setComplete(false);
    setLoading(true);

    await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.file.file);
        setLoading(false);
        setComplete(true);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2">
      <div className="z-10 space-y-4 w-full max-w-5xl items-center text-center flex flex-col font-mono text-sm">
        <h1 className="font-bold text-3xl">Generate an Image from Text</h1>
        <form onSubmit={(e) => generateImage(e, prompt)}>
          <input
            className="p-2 outline-none"
            placeholder="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            disabled={loading}
            type="submit"
            className={`border p-2 border-zinc-500 ${loading && "opacity-30"}`}
            onClick={(e) => generateImage(e, prompt)}
          >
            Generate
          </button>
        </form>
        {loading && <p>loading... this can take a couple minutes...</p>}
        {complete && <p>Done!</p>}
        {image !== "" && (
          <Image
            src={`${image.replace("./public", "")}`}
            height={300}
            width={300}
            alt=""
          />
        )}
      </div>
    </main>
  );
}
