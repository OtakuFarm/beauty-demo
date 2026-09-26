const messages = [
  "Complimentary shipping on orders over $75",
  "Two samples with every order",
  "30-day returns, no questions asked",
];

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-ink text-cream">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((group) => (
          <ul key={group} className="flex shrink-0" aria-hidden={group === 1 ? "true" : undefined}>
            {messages.map((message) => (
              <li
                key={`${group}-${message}`}
                className="flex items-center gap-6 whitespace-nowrap px-6 py-2.5 text-[11px] uppercase tracking-widest"
              >
                {message}
                <span aria-hidden="true" className="text-gold">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="sr-only">{messages.join(". ")}</p>
    </div>
  );
}
