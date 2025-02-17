// src/App.jsx
import React, { useState } from 'react';
import { Search, ArrowUpDown, Info } from 'lucide-react';

// Card Component
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
CardContent.displayName = "CardContent";

// Input Component
const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

// Button Component
const Button = React.forwardRef(({ className, variant, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      variant === 'outline' 
        ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
        : 'bg-blue-600 text-white hover:bg-blue-700'
    } h-10 px-4 py-2 ${className}`}
    {...props}
  />
));
Button.displayName = "Button";

// Switch Component
const Switch = React.forwardRef(({ checked, onCheckedChange, ...props }, ref) => (
  <button
    ref={ref}
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-blue-600' : 'bg-gray-200'
    }`}
    {...props}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
));
Switch.displayName = "Switch";

// Dialog Components
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className, ...props }) => (
  <div className={`relative ${className}`} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ children, className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
    {children}
  </div>
);

const DialogTitle = ({ children, className, ...props }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h2>
);

// Radio Group Components
const RadioGroup = ({ children, value, onValueChange, className, ...props }) => (
  <div className={`grid gap-2 ${className}`} {...props}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { checked: child.props.value === value, onChange: () => onValueChange(child.props.value) })
    )}
  </div>
);

const RadioGroupItem = ({ checked, children, value, onChange, ...props }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600"
      {...props}
    />
    {children}
  </label>
);

// Main Application Component
const ClientInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Demo',
      email: 'dev+demo@mcaretechnologie.com',
      activeSequences: 0,
      activeEmailAccount: 0,
      totalProspects: 0,
      totalEmailSent: 0,
      permission: 'No Access',
      createdOn: '16 Feb, 2025',
      isActive: true
    }
  ]);

  const handleAddClient = (clientData) => {
    const newClient = {
      id: clients.length + 1,
      name: `${clientData.firstName} ${clientData.lastName}`,
      email: clientData.email,
      activeSequences: 0,
      activeEmailAccount: 0,
      totalProspects: 0,
      totalEmailSent: 0,
      permission: clientData.permission,
      createdOn: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      isActive: true
    };
    setClients([...clients, newClient]);
  };

  return (
    <div className="p-6 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Client
        </Button>
      </div>

      {/* Table Section */}
      <Card className="w-full">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-medium text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>Client Name</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th className="p-4 text-center font-medium text-gray-500">Active Sequences</th>
                <th className="p-4 text-center font-medium text-gray-500">Active Email Account</th>
                <th className="p-4 text-center font-medium text-gray-500">Total Prospects</th>
                <th className="p-4 text-center font-medium text-gray-500">Total Email Sent</th>
                <th className="p-4 text-center font-medium text-gray-500">Permission</th>
                <th className="p-4 text-center font-medium text-gray-500">Created On</th>
                <th className="p-4 text-center font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{client.name}</span>
                      <span className="text-sm text-gray-500">{client.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">{client.activeSequences}</td>
                  <td className="p-4 text-center">{client.activeEmailAccount}</td>
                  <td className="p-4 text-center">{client.totalProspects}</td>
                  <td className="p-4 text-center">{client.totalEmailSent}</td>
                  <td className="p-4 text-center">{client.permission}</td>
                  <td className="p-4 text-center">{client.createdOn}</td>
                  <td className="p-4 text-center">
                    <Switch
                      checked={client.isActive}
                      onCheckedChange={(checked) => {
                        setClients(clients.map(c => 
                          c.id === client.id ? {...c, isActive: checked} : c
                        ));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Client Modal */}
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <span className="text-blue-600 text-xl">👥</span>
              Add Client
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleAddClient(Object.fromEntries(formData));
            setIsModalOpen(false);
          }} 
          className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input name="firstName" required placeholder="John" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input name="lastName" required placeholder="Doe" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Client Email</label>
              <Input name="email" type="email" required placeholder="john@acme.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input name="companyName" required placeholder="Acme" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Set Permissions</label>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              
              <RadioGroup
                name="permission"
                defaultValue="limited"
                className="space-y-2"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="full">
                    <div className="grid gap-1.5">
                      <span className="font-medium">Full access</span>
                      <p className="text-sm text-gray-500">Edit sequences, manage prospects, send replies, add templates.</p>
                    </div>
                  </RadioGroupItem>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="limited">
                    <div className="grid gap-1.5">
                      <span className="font-medium">Limited access</span>
                      <p className="text-sm text-gray-500">View sequences, get reports, send replies, connect mailboxes.</p>
                    </div>
                  </RadioGroupItem>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="none">
                    <div className="grid gap-1.5">
                      <span className="font-medium">No access</span>
                      <p className="text-sm text-gray-500">Do not give permission to login, Generate password later.</p>
                    </div>
                  </RadioGroupItem>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientInterface;