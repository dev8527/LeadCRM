import { useState, useRef, useEffect } from 'react';

export default function CustomEditor({ content, onChange }: { content: string; onChange: (content: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);
  
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-2">Custom Template</h2>
      <div className="border p-3 min-h-[200px]">
        <div
          ref={editorRef}
          contentEditable
          className="outline-none min-h-[180px]"
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button 
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => document.execCommand('bold')}
        >
          Bold
        </button>
        <button 
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => document.execCommand('italic')}
        >
          Italic
        </button>
        <button 
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => document.execCommand('underline')}
        >
          Underline
        </button>
      </div>
    </div>
  );
}