import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит кухня на заказ?",
    answer:
      "Стоимость зависит от размеров, материалов и комплектации. Мы предлагаем решения в разных ценовых категориях, чтобы каждый нашёл подходящий вариант. Точную цену рассчитаем после замера и обсуждения проекта — это бесплатно.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer:
      "Стандартный срок производства — от 3 до 6 недель с момента согласования проекта. Монтаж занимает 1–2 дня. Мы всегда соблюдаем сроки и заранее согласовываем дату установки.",
  },
  {
    question: "Приедете ли вы на замер?",
    answer:
      "Да, замер выезжает наш специалист — бесплатно и без обязательств. После замера мы разрабатываем 3D-проект и коммерческое предложение. Вы принимаете решение только после того, как увидите, как будет выглядеть ваша кухня.",
  },
  {
    question: "Какие материалы вы используете?",
    answer:
      "Мы работаем с проверенными поставщиками фасадов, столешниц и фурнитуры. Используем петли и направляющие Blum, МДФ и ЛДСП от ведущих производителей. Все материалы сертифицированы и безопасны для использования на кухне.",
  },
  {
    question: "Есть ли гарантия на кухню?",
    answer:
      "Да, мы даём гарантию 2 года на всю кухню и 5 лет на фурнитуру Blum. Если в гарантийный период что-то не так — приедем и исправим за свой счёт.",
  },
  {
    question: "Как начать заказ?",
    answer:
      "Оставьте заявку или позвоните нам — договоримся об удобном времени для бесплатного замера. После этого наш дизайнер разработает проект, и вы увидите будущую кухню в 3D ещё до начала производства.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}