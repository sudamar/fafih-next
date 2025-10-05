interface CardMovingProps {
  title: string
  bullets: string[]
  index?: number
}

export function CardMoving({ title, bullets, index = 0 }: CardMovingProps) {
  const isOdd = index % 2 !== 0
  const backBgClass = isOdd ? 'bg-footer-blue' : 'bg-[#006400]'

  return (
    <div className="focus-card-small">
      <div className="focus-card-inner-small">
        <div className="focus-card-face-small focus-card-front-small">
          <h3 className="text-base font-display font-semibold text-primary">{title}</h3>
        </div>
        <div className={`focus-card-face-small focus-card-back-small ${backBgClass}`}>
          <ul className="space-y-1 text-[0.7rem] leading-tight text-white">
            {bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
