import React from "react";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const AlertDialog = ({ open, onOpenChange, children }: AlertDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );
};

export const AlertDialogContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const AlertDialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 text-lg font-semibold">{children}</div>
);

export const AlertDialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const AlertDialogDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-500">{children}</p>
);

export const AlertDialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 flex justify-end space-x-2">{children}</div>
);

export const AlertDialogCancel = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className="px-4 py-2 border rounded-md text-gray-700">
    {children}
  </button>
);

export const AlertDialogAction = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 ${className}`}>
    {children}
  </button>
);
