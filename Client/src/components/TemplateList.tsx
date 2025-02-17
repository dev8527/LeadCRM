const templates = [
    { id: 1, name: "Welcome Email", content: "Hi [Name], Welcome to our platform!" },
    { id: 2, name: "Follow-up Email", content: "Hey [Name], just checking in!" },
  ];
  
  export default function TemplateList({ onSelect }: { onSelect: (content: string) => void }) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Predefined Templates</h2>
        {templates.map((template) => (
          <div key={template.id} className="p-2 border-b cursor-pointer" onClick={() => onSelect(template.content)}>
            <strong>{template.name}</strong>
          </div>
        ))}
      </div>
    );
  }
  