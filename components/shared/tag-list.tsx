interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="tags stack">
      {tags.map(tag => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}
