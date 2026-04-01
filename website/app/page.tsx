import Link from "next/link";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[#999] mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ProjectRow({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href?: string;
}) {
  const content = (
    <div className="flex justify-between items-baseline py-2 group">
      <span className="font-medium text-[#1a1a1a] group-hover:underline">
        {name}
      </span>
      <span className="text-sm text-[#999] ml-4 text-right">{description}</span>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:no-underline">
        {content}
      </a>
    );
  }
  return content;
}

export default function Home() {
  return (
    <div>
      {/* Summary */}
      <section className="mb-14">
        <h1 className="text-2xl font-semibold mb-4">Nishant Iyengar</h1>
        <p className="text-[#555] leading-relaxed">
          Builder and writer based in San Francisco. I enjoy solving interesting problems, 
          pushing society forward, and finding meaning throughout the process.
        </p>
      </section>

      {/* Values */}
      <Section title="Background">
        <ul className="space-y-2 text-[#555]">
          <li>Went to Duke and majored in Computer Science and Electrical Engineering.</li>
          <li>Joined <a href="https://www.miter.com" target="_blank" rel="noopener noreferrer" className="text-[#555] underline decoration-[#ccc] hover:decoration-[#555] transition-colors">Miter</a> as the third engineer, and took multiple product-pillars 0 → 1.</li>
          <li>Currently exploring reinforcement learning, agentic payments, and anything else.</li>
        </ul>
      </Section>

      {/* Projects */}
      <Section title="Projects">
        <div className="divide-y divide-[#eee]">
          <ProjectRow
            name="TankBet"
            description="Extending my childhood favorite game to remote play"
            href="https://tankbet.dev"
          />
        </div>
      </Section>

      {/* Investments */}
      <Section title="Investments">
        <div className="divide-y divide-[#eee]">
          <ProjectRow name="Vultron" description="Helping contractors win federal proposals" href="#" />
        </div>
      </Section>

      {/* Social */}
      <section className="pt-8 border-t border-[#eee]">
        <div className="flex gap-6 text-sm text-[#999]">
          <a
            href="https://www.linkedin.com/in/nishant-iyengar/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            linkedin
          </a>
          <a
            href="https://github.com/nishant-iyengar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            github
          </a>
          <a
            href="mailto:iyengar.nish@gmail.com"
            className="hover:text-[#1a1a1a] transition-colors"
          >
            email
          </a>
        </div>
      </section>
    </div>
  );
}
