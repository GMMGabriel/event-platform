import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video_ } from "../components/Video_";

export function Event() {
  // Pegando o parâmetro slug na url
  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug // Se não houver um slug, mostra nada na parte do vídeo
          ? <Video_ lessonSlug={slug} />
          : <div className="flex-1" />
        }
        <Sidebar />
      </main>
    </div>
  )
}