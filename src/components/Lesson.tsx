import { Link, useParams } from 'react-router-dom'
import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import classNames from 'classnames'

interface LessonProps { // propriedades da aula
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  // Pega a slug da URL
  const { slug } = useParams<{ slug: string }>()
  // Verifica se a data já passou, retornando um boolean
  const isLessonAvailable = isPast(props.availableAt);
  // Formata a data no padrão: "<dia da semana> • <dia> de <mês> • <horas>h<minutos>"
  const availableDateFormatted = format(
    props.availableAt, // data
    // Texto para a formatação (o que está entre aspas simples não será formatado)
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR, // configura para o português
    }
  );

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className={
        classNames(
          'bg-gray-700 rounded border border-gray-500 p-4 mt-2 transition-colors group-hover:border-green-500 relative', {
          'bg-green-500 border-green-500': isActiveLesson,
        })
      }>
        {isActiveLesson && (
          <div className="w-3 h-3 rounded-[2px] bg-green-500 absolute top-[50%] -translate-y-1/2 -left-[6px] rotate-45 transition z-0"></div>
        )}
        <header className="flex items-center justify-between">
          {isLessonAvailable ? ( // aplica a condicional de texto branco apenas se a aula estiver ativa
            <span className={classNames(
              'text-sm text-blue-500 font-medium flex items-center gap-2', {
              'text-white': isActiveLesson,
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classNames(
            "text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold", {
            "border-white": isActiveLesson,
          })}>
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={
          classNames(
            'text-grey-200 mt-5 block', {
            'text-white': isActiveLesson,
          })
        }>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}