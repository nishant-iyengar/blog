interface BadgeProps {
  tag: 'poem' | 'short story' | 'random';
}

export default function Badge({ tag }: BadgeProps) {
  return (
    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-[#629C77] !text-white">
      {tag}
    </span>
  );
}
