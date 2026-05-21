import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Светлый японди",
    category: "Кухня на заказ",
    location: "Светлый дуб · Керамика · Натуральные текстуры",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/494de8b9-7ff2-4de4-8592-5dc7609f9465/files/cf270a7d-075a-4400-a1eb-926a3acff932.jpg",
  },
  {
    id: 2,
    title: "Зелёный японди",
    category: "Кухня на заказ",
    location: "Глубокий зелёный · Дуб · Латунь",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/494de8b9-7ff2-4de4-8592-5dc7609f9465/files/beeb8996-3078-40eb-b73a-ed509d7aa562.jpg",
  },
  {
    id: 3,
    title: "Японди с островом",
    category: "Кухня-гостиная",
    location: "Песочные тона · Остров · Открытая планировка",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/494de8b9-7ff2-4de4-8592-5dc7609f9465/files/2d536a57-db6d-49e0-af11-79babf1aabab.jpg",
  },
  {
    id: 4,
    title: "Тёплый японди",
    category: "Кухня на заказ",
    location: "Орех · Белый матт · Терракота",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/494de8b9-7ff2-4de4-8592-5dc7609f9465/files/4e668c86-bd30-4552-bb13-fc9bdd164784.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Избранные работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наш каталог</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все кухни
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}